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
    .default("Untitled Resume"),

  templateId: Joi.number()
    .integer()
    .min(1)
    .default(1),

  public: Joi.boolean().default(false),

  
  fullName: Joi.string()
    .min(3)
    .max(50)
    .trim()
    .pattern(/^[\p{L}][\p{L}\s.'-]*$/u)
    .allow("")
    .default(""),

  profession: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .pattern(/^[\p{L}0-9\s./&+\-#]*$/u)
    .allow("")
    .default(""),

  email: Joi.string()
    .email()
    .max(60)
    .trim()
    .allow("")
    .default(""),

  phone: Joi.string()
    .max(20)
    .trim()
    .pattern(/^[0-9+\-\s()]*$/)
    .allow("")
    .default(""),

  location: Joi.string()
    .max(50)
    .trim()
    .pattern(/^[\p{L}\s,.'-]+$/u)
    .allow("")
    .default(""),

  linkedin: Joi.string()
    .uri()
    .allow("")
    .default(""),

  website: Joi.array()
    .items(Joi.string().uri().max(100))
    .max(5)
    .default([]),

  profileImageObject: Joi.object({
    profileImageUrl: Joi.string().uri().allow("").default(""),
  }).default({ profileImageUrl: "" }),

  professionalsummary: Joi.string()
    .max(500)
    .trim()
    .allow("")
    .default(""),

  education: Joi.array()
    .items(EducationItemSchema)
    .max(5)
    .default([]),

  skills: Joi.array()
    .items(
      Joi.string()
        .min(1)
        .max(40)
        .trim()
        .pattern(/^[\p{L}0-9.+#/&\s-]*$/u)
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
  allowUnknown: true,     // frontend sends extra fields
  stripUnknown: true,     // REMOVE them safely
  convert: false
});
