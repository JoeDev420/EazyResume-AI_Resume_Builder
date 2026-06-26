import openai from "../config/Gemini.js";
import User from "../models/User.js";
import extractTextFromFile from "../utils/extractText.cjs";


// --------------------------------------------------
// 1) Enhance Summary
// --------------------------------------------------
export const enhanceData = async (req, res) => {
  try {
    const { data } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user.premium) {
      return res.status(400).json({ success: false, message: "Unauthorized" });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content: "You are given resume data of a user, and you are supposed to return it in a polished form while making sure its of the correct length.you can also return a longer length version which sticks to the user's context but make sure its not too long but only return either one not both. only return improved data, nothing else no heading no endings only relevant data to the user"
        },
        {
          role: "user",
          content: data,
        },
      ],
    });

    const improvedData = response.choices[0].message.content.trim();
    res.status(200).json({ improvedData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// --------------------------------------------------
// 2) Create Resume AI
// --------------------------------------------------
export const createResumeAI = async (req, res) => {
  try {
    const { text, meta } = await extractTextFromFile(req.file);

    if (!text || text.length < 50) {
      return res.status(400).json({
        message: "Unable to extract readable text from resume"
      });
    }

    const rawTitle = req.file.originalname;
    const title = rawTitle.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ").trim();

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content: `You are parsing a resume titled: "${title}"

Convert resume text into VALID JSON using ONLY these keys:

title, fullName, email, phone, location, linkedin, website(array of strings),
profession, professionalsummary, skills(array of strings and only skill names included),
experience[{role,startDate,endDate,company,details(string),type,currentlyWorking}],
projects[{title,type,description}],
education[{degree,field,graduationDate(in years only, for ex. for 2020 june return: 2020-06),institute,cgpa(the raw value only),gradeType(one of: "CGPA","Percentage","Percentile" — detect from context, default "CGPA")}],
achievements[{title,issuer,description}],
profileImageObject{profileImageUrl},
sectionOrder[
  "summary",
  "education",
  "skills",
  "experience",
  "projects",
  "achievements",
]

Rules:
- Return JSON only
- Missing info -> empty string/array
- No extra fields
- for any detailed description like project description include appropriate and margins in the text`
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const raw = response.choices[0].message.content;
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const aiFormData = JSON.parse(cleaned);

    return res.json({ success: true, aiFormData });
  } catch (error) {
    console.error("Resume extraction failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to extract resume text"
    });
  }
};


// --------------------------------------------------
// 3) ATS Scan
// --------------------------------------------------

const buildResumeText = (formData) => {
  const lines = [];

  if (formData.fullName)   lines.push(`Name: ${formData.fullName}`);
  if (formData.profession) lines.push(`Target Role: ${formData.profession}`);
  if (formData.email)      lines.push(`Email: ${formData.email}`);
  if (formData.phone)      lines.push(`Phone: ${formData.phone}`);
  if (formData.location)   lines.push(`Location: ${formData.location}`);
  if (formData.linkedin)   lines.push(`LinkedIn: ${formData.linkedin}`);

  if (formData.professionalsummary)
    lines.push(`\nPROFESSIONAL SUMMARY:\n${formData.professionalsummary}`);

  if (formData.skills?.length)
    lines.push(`\nSKILLS:\n${formData.skills.join(', ')}`);

  if (formData.experience?.length) {
    lines.push('\nEXPERIENCE:');
    formData.experience.forEach(exp => {
      const period = `${exp.startDate || ''} - ${exp.currentlyWorking ? 'Present' : (exp.endDate || '')}`;
      lines.push(`  ${exp.role || ''} at ${exp.company || ''} (${period})`);
      if (exp.type)    lines.push(`  Type: ${exp.type}`);
      if (exp.details) lines.push(`  ${exp.details}`);
    });
  }

  if (formData.projects?.length) {
    lines.push('\nPROJECTS:');
    formData.projects.forEach(proj => {
      lines.push(`  ${proj.title || ''}${proj.type ? ` | ${proj.type}` : ''}`);
      if (proj.description) lines.push(`  ${proj.description}`);
    });
  }

  if (formData.education?.length) {
    lines.push('\nEDUCATION:');
    formData.education.forEach(edu => {
      const degree = [edu.degree, edu.field].filter(Boolean).join(' in ');
      lines.push(`  ${degree} | ${edu.institute || ''} | ${edu.graduationDate || ''}`);
      if (edu.cgpa) lines.push(`  ${edu.gradeType ?? 'CGPA'}: ${edu.cgpa}`);
    });
  }

  if (formData.achievements?.length) {
    lines.push('\nACHIEVEMENTS:');
    formData.achievements.forEach(ach => {
      lines.push(`  ${ach.title || ''}${ach.issuer ? ` | ${ach.issuer}` : ''}`);
      if (ach.description) lines.push(`  ${ach.description}`);
    });
  }

  return lines.join('\n');
};

export const atsScan = async (req, res) => {
  try {
    const { formData } = req.body;
    if (!formData) {
      return res.status(400).json({ error: "Resume data not provided" });
    }

    const resumeText = buildResumeText(formData);

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content: `You are an expert ATS (Applicant Tracking System) resume analyzer for tech/software engineering roles.

Analyze the resume and return ONLY valid JSON — no markdown, no extra text:

{
  "score": <integer 0-100>,
  "categories": [
    { "name": "Keywords",     "issues": [{ "problem": "<specific issue>", "fix": "<actionable one-sentence fix>" }] },
    { "name": "Content",      "issues": [{ "problem": "<specific issue>", "fix": "<actionable one-sentence fix>" }] },
    { "name": "Formatting",   "issues": [{ "problem": "<specific issue>", "fix": "<actionable one-sentence fix>" }] },
    { "name": "Completeness", "issues": [{ "problem": "<specific issue>", "fix": "<actionable one-sentence fix>" }] }
  ]
}

Score guide: 90-100 excellent, 75-89 good, 60-74 fair, below 60 needs significant work.
Always return all 4 categories. Use empty array [] for issues if none found in that category.

STRICT rules — violating any of these makes the analysis invalid:
- Dates in the future (2025, 2026, etc.) are NOT errors. The candidate may be a current student or actively employed — treat all dates as accurate and intentional.
- Do NOT suggest removing or reorganizing education entries (e.g. Class 10th, 12th). The candidate chose what to include; that is their decision, not an ATS issue.
- Do NOT suggest restructuring sections into subsections (e.g. splitting Skills into Languages/Frameworks/Tools). The resume format is fixed — only flag issues within the existing structure.
- Do NOT criticize personal content choices, career history length, or what the candidate decided to include or exclude.
- Only flag genuine ATS technical problems: missing action verbs, no quantifiable achievements, lack of industry keywords, overly long bullet points, missing contact fields, or sparse descriptions.`
        },
        {
          role: "user",
          content: resumeText
        }
      ]
    });

    const raw = response.choices[0].message.content ?? "";

    // Extract JSON: strip markdown fences, then grab the first {...} block
    const stripped = raw.replace(/```json|```/g, "").trim();
    const jsonMatch = stripped.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error(`No JSON object found in AI response: ${stripped.slice(0, 200)}`);

    const result = JSON.parse(jsonMatch[0]);

    const DEFAULT_CATEGORIES = ["Keywords", "Content", "Formatting", "Completeness"];
    const categories = Array.isArray(result.categories)
      ? result.categories
      : DEFAULT_CATEGORIES.map(name => ({ name, issues: [] }));

    return res.json({
      score: typeof result.score === 'number' ? Math.min(100, Math.max(0, result.score)) : 0,
      categories
    });

  } catch (err) {
    console.error("ATS Scan Error:", err.status ?? "", err.message, err.response?.data ?? "");
    return res.status(500).json({ error: "ATS scanning service is temporarily unavailable." });
  }
};
