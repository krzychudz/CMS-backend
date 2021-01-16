const Joi = require('joi');

exports.createProductBodyValidator = async (req, res, next) => {
    const productSchema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        isPublished: Joi.boolean().required(),
        imageUrl: Joi.string().allow(null)
    });

    try {
        await productSchema.validateAsync(req.body);
        next();
    }
    catch (err) { 
        res.status(400).json({error: err});
    }
}

exports.updateProductBodyValidator = async (req, res, next) => {
    const productSchema = Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        price: Joi.number(),
        isPublished: Joi.boolean(),
        imageUrl: Joi.string().allow(null)
    });

    try {
        await productSchema.validateAsync(req.body);
        next();
    }
    catch (err) { 
        console.log(err);
        res.status(400).json({error: err});
    }
}

exports.sendEmailBodyValidation = async (req, res, next) => {
    const emailSchema = Joi.object({
        recEmail: Joi.string().email().required(),
        subject: Joi.string().required(),
        message: Joi.string().required()
    });

    try {
        await emailSchema.validateAsync(req.body);
        next();
    }
    catch (err) { 
        res.status(400).json({error: err});
    }
}


