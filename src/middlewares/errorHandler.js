const { fail } = require("../utils/http");
const { ApiError } = require("../utils/ApiError");
const { v4: uuidv4 } = require("uuid");

function errorHandler(err, req, res, next) {
  const errorId = uuidv4();

  // ✅ FULL INTERNAL LOG (safe for backend only)
  console.error(`[${errorId}] [Global Error Handler]`, {
    message: err?.message,
    name: err?.name,
    statusCode: err?.statusCode,
    exceptionType: err?.exceptionType,
    details: err?.details,
    stack: err?.stack, //err?.stack?.split("\n").slice(0, 6).join("\n"),
    path: req?.originalUrl,
    method: req?.method,
  });

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ApiError) {
    const body = fail(err.statusCode, err.message, {
      errors: err.details || [],
      exceptionType: err.exceptionType,
      path: req.originalUrl,
    });

    body.errorId = errorId;
    return res.status(err.statusCode).json(body);
  }

  const body = fail(500, "Internal server error", {
    errors: [{ message: "Something went wrong. Please try again later." }],
    exceptionType: "SERVER_EXCEPTION",
    path: req.originalUrl,
  });

  body.errorId = errorId;
  return res.status(500).json(body);
}

module.exports = { errorHandler };
