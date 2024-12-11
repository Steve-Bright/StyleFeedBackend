import Joi from "joi";

export const MerchantSchema={
    register:Joi.object({
        email:Joi.required(),
        password:Joi.required(),
        phoneNumber:Joi.required(),
        confirmPassword:Joi.required(),
        shopName:Joi.required(),
        shopLocation:Joi.required(),
        productsCategories:Joi.required()
    })
}