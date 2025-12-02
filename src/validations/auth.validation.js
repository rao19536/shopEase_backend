const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Email is required",
  }),
  password: Joi.string().min(4).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 4 characters",
  }),
});

module.exports = { loginSchema };
