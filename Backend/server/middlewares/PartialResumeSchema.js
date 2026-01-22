import Joi from "joi";

/* -------------------- TITLE -------------------- */
export const titleSchema = Joi.object({
    title: Joi.string().min(3).max(80).trim().required(),
    profileImageUrl: Joi.string().allow("").trim()
}).options({ abortEarly: true, allowUnknown: false, convert: true });

export const editSchema = Joi.object({
    title: Joi.string().min(3).max(80).trim().required(),
    resumeId: Joi.string().trim().required()
}).options({ abortEarly: true, allowUnknown: false, convert: true });

/* -------------------- PERSONAL INFO -------------------- */
export const PersonalInfoSchema = Joi.object({
    resumeStep: Joi.number().valid(1),
    resumeId: Joi.string().trim().required(),

    fullName: Joi.string()
        .min(3).max(50)
        .pattern(/^[\p{L}][\p{L}\s.'-]*$/u)
        .allow("")
        .trim(),

    email: Joi.string()
        .email().max(60)
        .allow("")
        .trim(),

    profession: Joi.string()
        .min(2).max(50)
        .pattern(/^[\p{L}0-9\s./&+\-#]*$/u)
        .allow("")
        .trim(),

    phone: Joi.string()
        .min(7).max(20)
        .pattern(/^[0-9+\-\s()]*$/)
        .allow("")
        .trim(),

    location: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[\p{L}0-9\s,.'-]+$/u)
    .allow("")
    .trim(),

    linkedin: Joi.string()
        .uri()
        .pattern(/^https?:\/\/(www\.)?linkedin\.com\/.*$/)
        .max(100)
        .allow("")
        .trim(),

    linkedinShort: Joi.string()
        .min(3).max(100)
        .allow("")
        .trim(),

    website: Joi.array().items(
        Joi.string().uri().max(100).trim()
    ).max(5).default([]),

    websiteShort: Joi.array().items(
        Joi.string().min(3).max(100).trim()
    ).max(5).default([]),

    profileImageObject: Joi.object({
        profileImageUrl: Joi.string().uri().allow("").trim()
    }).default({ profileImageUrl: "" })

}).options({ abortEarly: true, allowUnknown: false, convert: true });

/* -------------------- SUMMARY -------------------- */
export const ProfessionalSummarySchema = Joi.object({
    resumeStep: Joi.number().valid(2),
    resumeId: Joi.string().trim().required(),

    professionalsummary: Joi.string()
        .min(20).max(500)
        .pattern(/^[^<>]*$/)
        .allow("")
        .trim()
}).options({ abortEarly: true, allowUnknown: false, convert: true });

/* -------------------- EDUCATION -------------------- */
export const EducationItemSchema = Joi.object({
    _id: Joi.any(),

    degree: Joi.string()
        .min(2).max(50)
        .pattern(/^[A-Za-z0-9\s.'()-]+$/)
        .allow("")
        .trim(),

    field: Joi.string()
        .min(2).max(50)
        .pattern(/^[A-Za-z0-9\s.'&-]+$/)
        .allow("")
        .trim(),

    institute: Joi.string()
        .min(2).max(80)
        .pattern(/^[A-Za-z0-9\s.,'&-]+$/)
        .allow("")
        .trim(),

    graduationDate: Joi.string()
        .max(20)
        .pattern(/^[A-Za-z0-9\s./-]*$/)
        .allow("")
        .trim(),

    cgpa: Joi.string()
        .max(10)
        .pattern(/^[A-Za-z0-9.+%/]*$/)
        .allow("")
        .trim()
});

export const EducationSchema = Joi.object({
    resumeStep: Joi.number().valid(3),
    resumeId: Joi.string().trim().required(),
    education: Joi.array().items(EducationItemSchema).max(5)
}).options({ abortEarly: true, allowUnknown: false, convert: true });

/* -------------------- SKILLS -------------------- */
export const SkillsSchema = Joi.object({
    resumeStep: Joi.number().valid(4),
    resumeId: Joi.string().trim().required(),

    skills: Joi.array().items(
        Joi.string()
            .min(1).max(40)
            .pattern(/^[\p{L}0-9.+#/&\s-]*$/u)
            .trim()
    ).max(20).default([])
}).options({ abortEarly: true, allowUnknown: false, convert: true });

/* -------------------- EXPERIENCE -------------------- */
export const ExperienceItemSchema = Joi.object({
    _id: Joi.any(),

    role: Joi.string()
        .min(2).max(60)
        .pattern(/^[\p{L}0-9\s.'&/+()-]*$/u)
        .allow("")
        .trim(),

    company: Joi.string()
        .min(2).max(80)
        .pattern(/^[\p{L}0-9\s.,'&/+()-]*$/u)
        .allow("")
        .trim(),

    startDate: Joi.string()
        .max(20)
        .pattern(/^[A-Za-z0-9\s./-]*$/)
        .allow("")
        .trim(),

    endDate: Joi.string()
        .max(20)
        .pattern(/^[A-Za-z0-9\s./-]*$/)
        .allow("")
        .trim(),

    type: Joi.string().valid("internship", "full-time", "part-time", "freelancing", ""),
    currentlyWorking: Joi.boolean(),

    details: Joi.string()
        .max(500)
        .pattern(/^[^<>]*$/)
        .allow("")
        .trim()
});

export const ExperienceSchema = Joi.object({
    resumeStep: Joi.number().valid(5),
    resumeId: Joi.string().trim().required(),
    experience: Joi.array().items(ExperienceItemSchema).max(10)
}).options({ abortEarly: true, allowUnknown: false, convert: true });

/* -------------------- PROJECTS -------------------- */
export const ProjectItemSchema = Joi.object({
    _id: Joi.any(),

    title: Joi.string()
        .min(2).max(80)
        .pattern(/^[\p{L}0-9\s.'&#/+()-]*$/u)
        .allow("")
        .trim(),

    type: Joi.string()
        .max(60)
        .pattern(/^[\p{L}0-9\s./,+-]*$/u)
        .allow("")
        .trim(),

    description: Joi.string()
        .max(600)
        .pattern(/^[^<>]*$/)
        .allow("")
        .trim()
});

export const ProjectsSchema = Joi.object({
    resumeStep: Joi.number().valid(6),
    resumeId: Joi.string().trim().required(),
    projects: Joi.array().items(ProjectItemSchema).max(10)
}).options({ abortEarly: true, allowUnknown: false, convert: true });

/* -------------------- ACHIEVEMENTS -------------------- */
export const AchievementItemSchema = Joi.object({
    _id: Joi.any(),

    title: Joi.string()
        .min(2).max(80)
        .pattern(/^[\p{L}0-9\s.'&#/+()-]*$/u)
        .allow("")
        .trim(),

    issuer: Joi.string()
        .max(80)
        .pattern(/^[\p{L}0-9\s.,'&/-]*$/u)
        .allow("")
        .trim(),

    description: Joi.string()
        .max(500)
        .pattern(/^[^<>]*$/)
        .allow("")
        .trim()
});

export const AchievementsSchema = Joi.object({
    resumeStep: Joi.number().valid(7),
    resumeId: Joi.string().trim().required(),
    achievements: Joi.array().items(AchievementItemSchema).max(10)
}).options({ abortEarly: true, allowUnknown: false, convert: true });

/* -------------------- PUBLISH -------------------- */
export const PublishSchema = Joi.object({
    resumeStep: Joi.number().valid(9).required(),
    resumeId: Joi.string().trim().required(),
    public: Joi.boolean().required()
}).options({ abortEarly: true, allowUnknown: false, convert: true });

/* -------------------- VALIDATOR -------------------- */
export const validateResumeName = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    req.body = value;
    next();
};
