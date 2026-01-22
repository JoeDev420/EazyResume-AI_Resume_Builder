import Joi from "joi";

/* ──────────────────────────────────────────────
   GLOBAL OPTIONAL STRING FIX (CRITICAL)
────────────────────────────────────────────── */
const optionalString = (regex, min = 0, max = 255) =>
  Joi.string()
    .trim()
    .min(min)
    .max(max)
    .pattern(regex)
    .allow("")
    .empty("");

/* ──────────────────────────────────────────────
   TITLE / EDIT
────────────────────────────────────────────── */
export const titleSchema = Joi.object({
  title: Joi.string().min(3).max(80).trim().required(),
  profileImageUrl: optionalString(/.*/, 0, 200),
}).options({ abortEarly: true, allowUnknown: false, convert: false });

export const editSchema = Joi.object({
  title: Joi.string().min(3).max(80).trim().required(),
  resumeId: Joi.string().trim().required(),
}).options({ abortEarly: true, allowUnknown: false, convert: false });

/* ──────────────────────────────────────────────
   PERSONAL INFO
────────────────────────────────────────────── */
export const PersonalInfoSchema = Joi.object({
  resumeStep: Joi.number().valid(1),
  resumeId: Joi.string().trim().required(),

  fullName: optionalString(/^[\p{L}][\p{L}\s.'-]*$/u, 3, 50),
  email: optionalString(/.*/, 0, 60).email(),
  profession: optionalString(/^[\p{L}0-9\s./&+\-#]*$/u, 2, 50),
  phone: optionalString(/^[0-9+\-\s()]*$/, 7, 20),
  location: optionalString(/^[\p{L}\s,.'-]+$/u, 2, 50),

  linkedin: optionalString(/^https?:\/\/(www\.)?linkedin\.com\/.*$/, 0, 100).uri(),
  linkedinShort: optionalString(/.*/, 3, 100),

  website: Joi.array()
    .items(optionalString(/.*/, 0, 100).uri())
    .max(5)
    .default([]),

  websiteShort: Joi.array()
    .items(optionalString(/.*/, 3, 100))
    .max(5)
    .default([]),

  profileImageObject: Joi.object({
    profileImageUrl: optionalString(/.*/, 0, 200).uri(),
  }).default({ profileImageUrl: "" }),
}).options({ abortEarly: true, allowUnknown: false, convert: false });

/* ──────────────────────────────────────────────
   PROFESSIONAL SUMMARY
────────────────────────────────────────────── */
export const ProfessionalSummarySchema = Joi.object({
  resumeStep: Joi.number().valid(2),
  resumeId: Joi.string().trim().required(),
  professionalsummary: optionalString(/^[^<>]*$/, 20, 500),
}).options({ abortEarly: true, allowUnknown: false, convert: false });

/* ──────────────────────────────────────────────
   EDUCATION
────────────────────────────────────────────── */
export const EducationItemSchema = Joi.object({
  _id: Joi.any(),
  degree: optionalString(/^[A-Za-z0-9\s.'()-]+$/, 2, 50),
  field: optionalString(/^[A-Za-z0-9\s.'&-]+$/, 2, 50),
  institute: optionalString(/^[A-Za-z0-9\s.,'&-]+$/, 2, 80),
  graduationDate: optionalString(/^[A-Za-z0-9\s./-]*$/, 0, 20),
  cgpa: optionalString(/^[A-Za-z0-9.+%/]*$/, 0, 10),
});

export const EducationSchema = Joi.object({
  resumeStep: Joi.number().valid(3),
  resumeId: Joi.string().trim().required(),
  education: Joi.array().items(EducationItemSchema).max(5).default([]),
}).options({ abortEarly: true, allowUnknown: false, convert: false });

/* ──────────────────────────────────────────────
   SKILLS
────────────────────────────────────────────── */
export const SkillsSchema = Joi.object({
  resumeStep: Joi.number().valid(4),
  resumeId: Joi.string().trim().required(),
  skills: Joi.array()
    .items(optionalString(/^[\p{L}0-9.+#/&\s-]*$/u, 1, 40))
    .max(20)
    .default([]),
}).options({ abortEarly: true, allowUnknown: false, convert: false });

/* ──────────────────────────────────────────────
   EXPERIENCE
────────────────────────────────────────────── */
export const ExperienceItemSchema = Joi.object({
  _id: Joi.any(),
  role: optionalString(/^[\p{L}0-9\s.'&/+()-]*$/u, 2, 60),
  company: optionalString(/^[\p{L}0-9\s.,'&/+()-]*$/u, 2, 80),
  startDate: optionalString(/^[A-Za-z0-9\s./-]*$/, 0, 20),
  endDate: optionalString(/^[A-Za-z0-9\s./-]*$/, 0, 20),
  type: Joi.string().valid("internship", "full-time", "part-time", "freelancing", "").empty(""),
  currentlyWorking: Joi.boolean(),
  details: optionalString(/^[^<>]*$/, 0, 500),
});

export const ExperienceSchema = Joi.object({
  resumeStep: Joi.number().valid(5),
  resumeId: Joi.string().trim().required(),
  experience: Joi.array().items(ExperienceItemSchema).max(10).default([]),
}).options({ abortEarly: true, allowUnknown: false, convert: false });

/* ──────────────────────────────────────────────
   PROJECTS
────────────────────────────────────────────── */
export const ProjectItemSchema = Joi.object({
  _id: Joi.any(),
  title: optionalString(/^[\p{L}0-9\s.'&#/+()-]*$/u, 2, 80),
  type: optionalString(/^[\p{L}0-9\s./,+-]*$/u, 0, 60),
  description: optionalString(/^[^<>]*$/, 0, 600),
});

export const ProjectsSchema = Joi.object({
  resumeStep: Joi.number().valid(6),
  resumeId: Joi.string().trim().required(),
  projects: Joi.array().items(ProjectItemSchema).max(10).default([]),
}).options({ abortEarly: true, allowUnknown: false, convert: false });

/* ──────────────────────────────────────────────
   ACHIEVEMENTS
────────────────────────────────────────────── */
export const AchievementItemSchema = Joi.object({
  _id: Joi.any(),
  title: optionalString(/^[\p{L}0-9\s.'&#/+()-]*$/u, 2, 80),
  issuer: optionalString(/^[\p{L}0-9\s.,'&/-]*$/u, 0, 80),
  description: optionalString(/^[^<>]*$/, 0, 500),
});

export const AchievementsSchema = Joi.object({
  resumeStep: Joi.number().valid(7),
  resumeId: Joi.string().trim().required(),
  achievements: Joi.array().items(AchievementItemSchema).max(10).default([]),
}).options({ abortEarly: true, allowUnknown: false, convert: false });

/* ──────────────────────────────────────────────
   PUBLISH
────────────────────────────────────────────── */
export const PublishSchema = Joi.object({
  resumeStep: Joi.number().valid(9).required(),
  resumeId: Joi.string().trim().required(),
  public: Joi.boolean().required(),
}).options({ abortEarly: true, allowUnknown: false, convert: false });

/* ──────────────────────────────────────────────
   VALIDATOR MIDDLEWARE
────────────────────────────────────────────── */
export const validateResumeName = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
};
