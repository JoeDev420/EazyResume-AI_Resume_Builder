import {
  PersonalInfoSchema,
  ProfessionalSummarySchema,
  EducationSchema,
  SkillsSchema,
  ExperienceSchema,
  ProjectsSchema,
  AchievementsSchema,
  PublishSchema
} from "./PartialResumeSchema.js";



export const validatePartialResume = (req, res, next) => {

  try {
    const { resumeStep } = req.body;

    if (typeof resumeStep !== "number") {     //resume step must be sent
      return res.status(400).json({
        message: "Invalid or missing resumeStep"
      });
    }

    


    else if(req.body.templateId || req.body.sectionVisibility || req.body.sectionOrder){ //add extra check for body length to be less than or equal to 2


      next()

      return

    }

    let schema;

    switch (resumeStep) {
      case 1:
        schema = PersonalInfoSchema;
        break;

      case 2:
        schema = ProfessionalSummarySchema;
        break;

      case 3:
        schema = EducationSchema;
        break;

      case 4:
        schema = SkillsSchema;
        break;

      case 5:
        schema = ExperienceSchema;
        break;

      case 6:
        schema = ProjectsSchema;
        break;

      case 7:
        schema = AchievementsSchema;
        break;

      case 9:
        schema=PublishSchema;
        break;


      default:
        return res.status(400).json({
          message: "Invalid resume step"
        });
    }

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    // overwrite body with validated data
    req.body = value;
    next();

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Validation failed"
    });
  }
};
