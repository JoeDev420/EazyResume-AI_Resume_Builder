import Joi from "joi";
import {
  AchievementItemSchema,
  EducationItemSchema,
  ExperienceItemSchema,
  ProjectItemSchema,
} from "./PartialResumeSchema.js";

/* ──────────────────────────────────────────────
   GLOBAL OPTIONAL STRING FIX
────────────────────────────────────────────── */
const optionalString = (regex, min = 0, max = 255) =>
  Joi.string()
    .trim()
    .min(min)
    .max(max)
    .pattern(regex)
    .allow("")
    .empty("");

export const FullResumeSchema = Joi.object({
  /* ───────── REQUIRED ───────── */
  resumeId: Joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "Resume ID is missing",
      "string.empty": "Resume ID is required",
    }),

  /* ───────── BASIC META ───────── */
  title: optionalString(/.*/, 3, 80).default("Untitled Resume"),

  templateId: Joi.number().integer().min(1).default(1),

  public: Joi.boolean().default(false),

  /* ───────── PERSONAL INFO ───────── */
  fullName: optionalString(/^[\p{L}][\p{L}\s.'-]*$/u, 3, 50).default(""),

  profession: optionalString(
    /^[\p{L}0-9\s./&+\-#]*$/u,
    2,
    50
  ).default(""),

  email: optionalString(/.*/, 0, 60).email().default(""),

  phone: optionalString(/^[0-9+\-\s()]*$/, 0, 20).default(""),

  location: optionalString(/^[\p{L}\s,.'-]+$/u, 0, 50).default(""),

  linkedin: optionalString(/.*/, 0, 100).uri().default(""),

  linkedinShort: optionalString(/.*/, 0, 100).default(""),

  website: Joi.array()
    .items(optionalString(/.*/, 0, 100).uri())
    .max(5)
    .default([]),

  websiteShort: Joi.array()
    .items(optionalString(/.*/, 0, 100))
    .max(5)
    .default([]),

  profileImageObject: Joi.object({
    profileImageUrl: optionalString(/.*/, 0, 200).uri().default(""),
  }).default({ profileImageUrl: "" }),

  /* ───────── SUMMARY ───────── */
  professionalsummary: optionalString(/^[^<>]*$/, 0, 500).default(""),

  /* ───────── EDUCATION ───────── */
  education: Joi.array()
    .items(EducationItemSchema)
    .max(5)
    .default([]),

  /* ───────── SKILLS ───────── */
  skills: Joi.array()
    .items(
      optionalString(/^[\p{L}0-9.+#/&\s-]*$/u, 1, 40)
    )
    .max(20)
    .default([]),

  /* ───────── EXPERIENCE ───────── */
  experience: Joi.array()
    .items(ExperienceItemSchema)
    .max(10)
    .default([]),

  /* ───────── PROJECTS ───────── */
  projects: Joi.array()
    .items(ProjectItemSchema)
    .max(10)
    .default([]),

  /* ───────── ACHIEVEMENTS ───────── */
  achievements: Joi.array()
    .items(AchievementItemSchema)
    .max(10)
    .default([]),

  /* ───────── UI CONFIG ───────── */
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
      "achievements",
    ]),

  sectionVisibility: Joi.object({
    profilePic: Joi.boolean().default(true),
    summary: Joi.boolean().default(true),
    education: Joi.boolean().default(true),
    skills: Joi.boolean().default(true),
    experience: Joi.boolean().default(true),
    projects: Joi.boolean().default(true),
    achievements: Joi.boolean().default(true),
  }).default({
    profilePic: true,
    summary: true,
    education: true,
    skills: true,
    experience: true,
    projects: true,
    achievements: true,
  }),
}).options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
  convert: false,
});
