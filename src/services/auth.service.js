const { User } = require("../database/models");
const { ApiError } = require("../utils/ApiError");
const { loginSchema } = require("../validations/auth.validation");
const bcrypt = require("bcryptjs");

module.exports = {
  login: async (payload) => {
    const { error } = loginSchema.validate(payload, { abortEarly: false });
    if (error) {
      throw ApiError.validation(error.details);
    }
    const user = await User.scope('withPassword').findOne({ where: { email: payload.email } });
    const authError = ApiError.unauthorized("Invalid email or password");
    if (!user) {
      throw authError;
    }
    const match = await bcrypt.compare(payload.password, user.password);
    if (!match) throw authError;

    const tokenPayload = { id: user.id, email: user.email, role: user.role };
    return tokenPayload
  },
};
