class ApiError extends Error {
  constructor(statusCode, message, { exceptionType, details } = {}) {
    super(message);
    this.statusCode = statusCode;
    this.exceptionType = exceptionType;
    this.details = details;
    Error.captureStackTrace?.(this, this.constructor);
  }

  static validation(details, message = "Validation failed") {
    const errors = details.map((d) => ({
      field: d.path.join("."),
      message: d.message.replace(/["]/g, ""),
    }));
    return new ApiError(400, message, {
      exceptionType: "VALIDATION_EXCEPTION",
      details: errors,
    });
  }
  static notFound(message = "Not found", details = null) {
    return new ApiError(404, message, { exceptionType: "NOT_FOUND", details });
  }
  static unauthorized(message = "Unauthorized", details = null) {
    return new ApiError(401, message, {
      exceptionType: "UNAUTHORIZED",
      details,
    });
  }
  static forbidden(message = "Forbidden", details = null) {
    return new ApiError(403, message, { exceptionType: "FORBIDDEN", details });
  }
  static conflict(message = "Conflict", details = null) {
    return new ApiError(409, message, { exceptionType: "CONFLICT", details });
  }
  static tooManyRequests(message = "Too many requests", details = null) {
    return new ApiError(429, message, {
      exceptionType: "TOO_MANY_REQUESTS",
      details,
    });
  }
  static serverError(message = "Internal server error", details = null) {
    return new ApiError(500, message, {
      exceptionType: "SERVER_EXCEPTION",
      details,
    });
  }
  static gatewayTimeout(message = "Gateway timeout", details = null) {
    return new ApiError(504, message, {
      exceptionType: "GATEWAY_TIMEOUT",
      details,
    });
  }
}

module.exports = { ApiError };
