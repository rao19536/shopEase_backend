const { fail } = require("../utils/http");
const { ApiError } = require("../utils/ApiError");

function errorHandler(err, req, res, _next) {
  if (err instanceof ApiError) {
    const body = fail(err.statusCode, err.message, {
      errors: err.details,
      exceptionType: err.exceptionType,
      path: req.originalUrl,
    });
    return res.status(err.statusCode).json(body);
  }

  const status = err?.statusCode || 500;
  const msg = err?.message || "Internal server error";
  const body = fail(status, msg, { exceptionType: "SERVER_EXCEPTION", path: req.originalUrl });
  return res.status(status).json(body);
}

module.exports = { errorHandler };
