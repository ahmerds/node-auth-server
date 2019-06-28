import Joi from "joi";

export const ClientSchema = Joi.object().keys({
    "client_id": Joi.string().required()
});

export const UserSchema = Joi.object().keys({
    "email": Joi.string().email().required(),
    "password": Joi.string().min(5).max(20).required(),
    "username": Joi.string().alphanum().min(3).max(20).required(),
    "client": ClientSchema
});