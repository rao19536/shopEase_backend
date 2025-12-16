const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/ApiError");
const { User } = require("../database/models");
const { verifyAccessToken } = require("../utils/token");

const getTokenFromReq = (req) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    return authHeader.split(" ")[1];
  }

  if (req.cookies && req.cookies.accessToken) {
    return req.cookies.accessToken;
  }

  return null;
};

const authenticate = async (req, res, next) => {
  try {
    const token = getTokenFromReq(req);
    if (!token) {
      return next(ApiError.unauthorized("Access token required"));
    }

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (err) {
      return next(ApiError.unauthorized("Invalid or expired access token"));
    }

    const user = await User.findByPk(payload.id);
    if (!user)
      return next(ApiError.unauthorized("Invalid token: user not found"));

    if (user.active === false) {
      return next(ApiError.forbidden("Account is disabled"));
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      active: user.active,
    };

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = { authenticate };
