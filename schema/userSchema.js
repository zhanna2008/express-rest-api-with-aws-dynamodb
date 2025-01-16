import Joi from "joi";

export const userSchema = Joi.object({
  id: Joi.string().required(),
  age: Joi.number().integer().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.string().required(),
});

export const updateUserValidationSchema = Joi.object({
  id: Joi.string().required(),
  age: Joi.number().integer(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  phoneNumber: Joi.string(),
});

export const deleteUserValidationSchema = Joi.object({
  id: Joi.string().required(),
});

export const getUserValidationSchema = Joi.object({
  id: Joi.string().required(),
});
