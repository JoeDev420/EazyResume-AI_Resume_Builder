import Joi from "joi";
import {
  AchievementItemSchema,
  EducationItemSchema,
  ExperienceItemSchema,
  ProjectItemSchema
} from "./PartialResumeSchema.js";

export const FullResumeSchema = Joi.object({

  resumeId: Joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "Resume ID is missing",
      "string.empty": "Resume ID is required"
    }),

  title: Joi.string()
    .min(3)
    .max(80)
    .allow("")
    .default("Untitled Resume")
    .trim(),

  templateId: Joi.number()
    .integer()
    .min(1)
    .default(1),

  public: Joi.boolean().default(false),

  fullName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[\p{L}][\p{L}\s.'-]*$/u)
    .allow("")
    .default("")
    .trim(),

  profession: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[\p{L}0-9\s./&+\-#]*$/u)
    .allow("")
    .default("")
    .trim(),

  email: Joi.string()
    .email()
    .max(60)
    .allow("")
    .default("")
    .trim(),

  phone: Joi.string()
    .max(20)
    .pattern(/^[0-9+\-\s()]*$/)
    .allow("")
    .default("")
    .trim(),

  location: Joi.string()
    .max(50)
    .pattern(/^[\p{L}\s,.'-]+$/u)
    .allow("")
    .default("")
    .trim(),

  linkedin: Joi.string()
    .uri()
    .allow("")
    .default("")
    .trim(),

  website: Joi.array()
    .items(Joi.string().uri().max(100).trim())
    .max(5)
    .default([]),

  linkedinShort: Joi.string()
    .max(100)
    .allow("")
    .default("")
    .trim(),

  websiteShort: Joi.array()
    .items(Joi.string().max(100).trim())
    .max(5)
    .default([]),

  profileImageObject: Joi.object({
    profileImageUrl: Joi.string().uri().allow("").default("").trim(),
  }).default({ profileImageUrl: "" }),

  professionalsummary: Joi.string()
    .max(500)
    .allow("")
    .default("")
    .trim(),

  education: Joi.array()
    .items(EducationItemSchema)
    .max(5)
    .default([]),

  skills: Joi.array()
    .items(
      Joi.string()
        .min(1)
        .max(40)
        .pattern(/^[\p{L}0-9.+#/&\s-]*$/u)
        .trim()
    )
    .max(20)
    .default([]),

  experience: Joi.array()
    .items(ExperienceItemSchema)
    .max(10)
    .default([]),

  projects: Joi.array()
    .items(ProjectItemSchema)
    .max(10)
    .default([]),

  achievements: Joi.array()
    .items(AchievementItemSchema)
    .max(10)
    .default([]),

  sectionOrder: Joi.array()
    .items(
      Joi.string().valid(
        "summary",
        "education",
        "skills",
        "experience",
        "projects",
        "achievements"
      )
    )
    .length(6)
    .unique()
    .default([
      "summary",
      "education",
      "skills",
      "experience",
      "projects",
      "achievements"
    ]),

  sectionVisibility: Joi.object({
    profilePic: Joi.boolean().default(true),
    summary: Joi.boolean().default(true),
    education: Joi.boolean().default(true),
    skills: Joi.boolean().default(true),
    experience: Joi.boolean().default(true),
    projects: Joi.boolean().default(true),
    achievements: Joi.boolean().default(true)
  }).default({
    profilePic: true,
    summary: true,
    education: true,
    skills: true,
    experience: true,
    projects: true,
    achievements: true
  })

})
.options({
  abortEarly: false,
  allowUnknown: true,   // frontend sends extra fields
  stripUnknown: true,   // remove them safely
  convert: true
});
