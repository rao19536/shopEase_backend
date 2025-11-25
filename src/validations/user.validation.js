const Joi = require("joi");

const baseUserSchema = Joi.object({
  name: Joi.string().trim().min(1).messages({
    "string.empty": "Name is required",
  }),
  email: Joi.string().trim().lowercase().email().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Email is required",
  }),
  password: Joi.string().min(4).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 4 characters",
  }),
  role: Joi.string().valid("USER", "ADMIN", "SUPER_ADMIN"),
}).options({ abortEarly: false, stripUnknown: true });

const createUserSchema = baseUserSchema.fork(
  ["name", "email", "password"],
  (schema) => schema.required()
);

const updateUserSchema = baseUserSchema.min(1);

module.exports = { createUserSchema, updateUserSchema };
