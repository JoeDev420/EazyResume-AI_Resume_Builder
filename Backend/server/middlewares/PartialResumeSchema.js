import Joi from "joi";

export const titleSchema = Joi.object({
    title: Joi.string().min(3).max(80).trim().required(),
    profileImageUrl: Joi.string().trim().allow("")
}).options({
    abortEarly: true,
    allowUnknown: false,
    convert: false,
});

export const editSchema = Joi.object({
    title: Joi.string().min(3).max(80).trim().required(),
    resumeId: Joi.string().trim().required()
}).options({
    abortEarly: true,
    allowUnknown: false,
    convert: false,
});


export const PersonalInfoSchema = Joi.object({
    resumeStep: Joi.number().valid(1).messages({
        "any.only": "Invalid resume step"
    }),
    resumeId: Joi.string().trim().required().messages({
        "any.required": "Resume ID is missing",
        "string.empty": "Resume ID is required"
    }),
    fullName: Joi.string()
        .min(3)
        .max(50)
        .trim()
        .pattern(/^[\p{L}][\p{L}\s.'-]*$/u)
        .allow("")
        .messages({
            "string.pattern.base": "Name should contain only letters",
            "string.min": "Name must be at least 3 characters",
            "string.max": "Name must be less than 50 characters"
        }),
    email: Joi.string().email().max(60).trim().allow("").messages({
        "string.email": "Please enter a valid email address",
        "string.max": "Email is too long"
    }),
    profession: Joi.string()
        .min(2)
        .max(50)
        .trim()
        .pattern(/^[\p{L}0-9\s./&+\-#]*$/u)
        .allow("")
        .messages({
            "string.pattern.base": "Profession contains invalid characters",
            "string.min": "Profession is too short",
            "string.max": "Profession is too long"
        }),
    phone: Joi.string()
        .min(7)
        .max(20)
        .trim()
        .pattern(/^[0-9+\-\s()]*$/)
        .allow("")
        .messages({
            "string.pattern.base": "Phone number can contain only digits and + - ( )",
            "string.min": "Phone number is too short",
            "string.max": "Phone number is too long"
        }),
    location: Joi.string()
        .min(2)
        .max(50)
        .trim()
        .pattern(/^[\p{L}\s,.'-]+$/u)
        .allow("")
        .messages({
            "string.pattern.base": "Location should contain only letters",
            "string.min": "Location is too short",
            "string.max": "Location is too long"
        }),
    linkedin: Joi.string()
        .uri()
        .pattern(/^https?:\/\/(www\.)?linkedin\.com\/.*$/)
        .max(100)
        .trim()
        .allow("")
        .messages({
            "string.uri": "Please enter a valid LinkedIn URL",
            "string.pattern.base": "LinkedIn URL must be from linkedin.com"
        }),
    website: Joi.array()
        .items(
            Joi.string()
                .uri()
                .max(100)
                .trim()
                .messages({
                    "string.uri": "Website must be a valid URL",
                    "string.max": "Website URL is too long"
                })
        )
        .max(5)
        .default([]),
    profileImageObject: Joi.object({
        profileImageUrl: Joi.string()
            .uri()
            .trim()
            .allow("")
            .messages({
                "string.uri": "Profile image URL must be valid"
            }),
    }).default({ profileImageUrl: "" })
}).options({
    abortEarly: true,
    allowUnknown: false,
    convert: false
});


export const ProfessionalSummarySchema = Joi.object({
    resumeStep: Joi.number().valid(2).messages({ "any.only": "Invalid resume step" }),
    resumeId: Joi.string().trim().required().messages({
        "any.required": "Resume ID is missing",
        "string.empty": "Resume ID is required"
    }),
    professionalsummary: Joi.string()
        .min(20)
        .max(500)
        .trim()
        .allow("")
        .pattern(/^[^<>]*$/)
        .messages({
            "string.min": "Summary should be at least 20 characters",
            "string.max": "Summary should be less than 500 characters",
            "string.pattern.base": "Summary cannot contain HTML tags"
        })
}).options({ abortEarly: true, allowUnknown: false, convert: false });


export const EducationItemSchema = Joi.object({
    _id: Joi.any(),
    degree: Joi.string()
        .min(2)
        .max(50)
        .trim()
        .pattern(/^[A-Za-z0-9\s.'()-]+$/)
        .allow("")
        .messages({
            "string.pattern.base": "Degree format is invalid",
            "string.min": "Degree is too short",
            "string.max": "Degree is too long"
        }),
    field: Joi.string()
        .min(2)
        .max(50)
        .trim()
        .pattern(/^[A-Za-z0-9\s.'&-]+$/)
        .allow("")
        .messages({ "string.pattern.base": "Field of study format is invalid" }),
    institute: Joi.string()
        .min(2)
        .max(80)
        .trim()
        .pattern(/^[A-Za-z0-9\s.,'&-]+$/)
        .allow("")
        .messages({ "string.pattern.base": "Institute name format is invalid" }),
    graduationDate: Joi.string()
        .max(20)
        .trim()
        .pattern(/^[A-Za-z0-9\s./-]*$/)
        .allow("")
        .messages({ "string.pattern.base": "Graduation date format is invalid" }),
    cgpa: Joi.string()
        .max(10)
        .trim()
        .pattern(/^[A-Za-z0-9.+%/]*$/)
        .allow("")
        .messages({ "string.pattern.base": "CGPA format is invalid" })
});

export const EducationSchema = Joi.object({
    resumeStep: Joi.number().valid(3).messages({ "any.only": "Invalid resume step" }),
    resumeId: Joi.string().trim().required().messages({ "any.required": "Resume ID is missing" }),
    education: Joi.array().items(EducationItemSchema).max(5).messages({
        "array.max": "You can add up to 5 education entries"
    })
}).options({ abortEarly: true, allowUnknown: false, convert: false });

export const SkillsSchema = Joi.object({
    resumeStep: Joi.number().valid(4).messages({ "any.only": "Invalid resume step" }),
    resumeId: Joi.string().trim().required().messages({
        "any.required": "Resume ID is missing",
        "string.empty": "Resume ID is required"
    }),
    skills: Joi.array()
        .items(
            Joi.string()
                .min(1)
                .max(40)
                .trim()
                .pattern(/^[\p{L}0-9.+#/&\s-]*$/u)
                .messages({
                    "string.pattern.base": "Skill contains invalid characters",
                    "string.max": "Skill name is too long"
                })
        )
        .max(20)
        .default([])
        .messages({ "array.max": "You can add up to 20 skills" })
}).options({ abortEarly: true, allowUnknown: false, convert: false });


export const ExperienceItemSchema = Joi.object({
    _id: Joi.any(),
    role: Joi.string()
        .min(2)
        .max(60)
        .trim()
        .pattern(/^[\p{L}0-9\s.'&/+()-]*$/u)
        .allow("")
        .messages({ "string.pattern.base": "Role format is invalid" }),
    company: Joi.string()
        .min(2)
        .max(80)
        .trim()
        .pattern(/^[\p{L}0-9\s.,'&/+()-]*$/u)
        .allow("")
        .messages({ "string.pattern.base": "Company format is invalid" }),
    startDate: Joi.string()
        .max(20)
        .trim()
        .pattern(/^[A-Za-z0-9\s./-]*$/)
        .allow("")
        .messages({ "string.pattern.base": "Start date format is invalid" }),
    endDate: Joi.string()
        .max(20)
        .trim()
        .pattern(/^[A-Za-z0-9\s./-]*$/)
        .allow("")
        .messages({ "string.pattern.base": "End date format is invalid" }),
    type: Joi.string()
        .valid("internship", "full-time", "part-time", "freelancing", "")
        .messages({ "any.only": "Invalid employment type" }),
    currentlyWorking: Joi.boolean(),
    details: Joi.string()
        .max(500)
        .trim()
        .pattern(/^[^<>]*$/)
        .allow("")
        .messages({ "string.max": "Experience details are too long" })
});

export const ExperienceSchema = Joi.object({
    resumeStep: Joi.number().valid(5).messages({ "any.only": "Invalid resume step" }),
    resumeId: Joi.string().trim().required().messages({ "any.required": "Resume ID is missing" }),
    experience: Joi.array().items(ExperienceItemSchema).max(10).messages({
        "array.max": "You can add up to 10 experience entries"
    })
}).options({ abortEarly: true, allowUnknown: false, convert: false });


export const ProjectItemSchema = Joi.object({
    _id: Joi.any(),
    title: Joi.string()
        .min(2)
        .max(80)
        .trim()
        .pattern(/^[\p{L}0-9\s.'&#/+()-]*$/u)
        .allow("")
        .messages({ "string.pattern.base": "Project title format is invalid" }),
    type: Joi.string()
        .max(60)
        .trim()
        .pattern(/^[\p{L}0-9\s./,+-]*$/u)
        .allow("")
        .messages({ "string.pattern.base": "Project type format is invalid" }),
    description: Joi.string()
        .max(600)
        .trim()
        .pattern(/^[^<>]*$/)
        .allow("")
        .messages({ "string.pattern.base": "Description cannot contain HTML tags" })
});

export const ProjectsSchema = Joi.object({
    resumeStep: Joi.number().valid(6).messages({ "any.only": "Invalid resume step" }),
    resumeId: Joi.string().trim().required().messages({ "any.required": "Resume ID is missing" }),
    projects: Joi.array().items(ProjectItemSchema).max(10).messages({
        "array.max": "You can add up to 10 projects"
    })
}).options({ abortEarly: true, allowUnknown: false, convert: false });


export const AchievementItemSchema = Joi.object({
    _id: Joi.any(),
    title: Joi.string()
        .min(2)
        .max(80)
        .trim()
        .pattern(/^[\p{L}0-9\s.'&#/+()-]*$/u)
        .allow(""),
    issuer: Joi.string()
        .max(80)
        .trim()
        .pattern(/^[\p{L}0-9\s.,'&/-]*$/u)
        .allow(""),
    description: Joi.string()
        .max(500)
        .trim()
        .pattern(/^[^<>]*$/)
        .allow("")
});

export const AchievementsSchema = Joi.object({
    resumeStep: Joi.number().valid(7).messages({ "any.only": "Invalid resume step" }),
    resumeId: Joi.string().trim().required().messages({ "any.required": "Resume ID is missing" }),
    achievements: Joi.array().items(AchievementItemSchema).max(10)
}).options({ abortEarly: true, allowUnknown: false, convert: false });


export const PublishSchema = Joi.object({
    resumeStep: Joi.number().valid(9).required(),
    resumeId: Joi.string().trim().required(),
    public: Joi.boolean().required()
}).options({ abortEarly: true, allowUnknown: false, convert: false });

export const validateResumeName = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    req.body = value;
    next();
};
