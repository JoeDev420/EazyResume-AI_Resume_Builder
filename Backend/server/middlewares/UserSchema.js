import Joi from "joi";
   
    export const signupSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .trim()
        .required(),

    email: Joi.string()
        .email()
        .lowercase()
        .required(),

    password: Joi.string()
        .min(8)
        .max(50)
        .required()
    })
    .options({
    abortEarly: true,      // stop at first error
    allowUnknown: false,    // reject extra fields
    convert: false,
    });

    


    
    export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .lowercase()
        .required(),

    password: Joi.string()
        .min(8)
        .max(50)
        .required()
    })
    .options({
    abortEarly: true,
    allowUnknown: false,
    convert: false,
    });


   

    export const validateUser = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
        message: error.details[0].message
        });
    }

    // Replace req.body with validated & sanitized data
    req.body = value;
    next();
    };


