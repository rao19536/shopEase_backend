const authService = require("../services/auth.service");
const { ok } = require("../utils/http");
const { signAccessToken, signRefreshToken } = require("../utils/token");

module.exports = {
  login: async (req, res, next) => {
    try {
      const tokenPayload = await authService.login(req.body);
      const accessToken = signAccessToken(tokenPayload);
      const refreshToken = signRefreshToken({ id: tokenPayload.id });
      return res.json(ok({ accessToken, refreshToken }, "Login successful", req.originalUrl));
    } catch (err) {
      next(err);
    }
  },
};
