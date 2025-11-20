const { fail } = require("../utils/http");
const { ApiError } = require("../utils/ApiError");
const { v4: uuidv4 } = require("uuid");

function errorHandler(err, req, res, _next) {
  const errorId = uuidv4();

  console.error(`[${errorId}] [Global Error Handler]`, {
    message: err?.message,
    name: err?.name,
    statusCode: err?.statusCode,
    exceptionType: err?.exceptionType,
    details: err?.details,
    stack: err?.stack?.split("\n").slice(0, 6).join("\n"),
    path: req?.originalUrl,
    method: req?.method,
  });

  if (res.headersSent) {
    return _next(err);
  }

  if (err instanceof ApiError) {
    const body = fail(err.statusCode, err.message, {
      errors: err.details || null,
      exceptionType: err.exceptionType || null,
      path: req.originalUrl,
    });
    body.errorId = errorId;
    return res.status(err.statusCode).json(body);
  }

  const status = err?.statusCode || 500;
  const msg =
    err?.message || (typeof err === "string" ? err : "Internal server error");

  const body = fail(status, msg, {
    exceptionType: "SERVER_EXCEPTION",
    path: req.originalUrl,
  });
  body.errorId = errorId;

  return res.status(status).json(body);
}

module.exports = { errorHandler };
