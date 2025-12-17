class ApiError extends Error {
  constructor(statusCode, message, { exceptionType, details = [] } = {}) {
    super(message);
    this.statusCode = statusCode;
    this.exceptionType = exceptionType;
    this.details = Array.isArray(details) ? details : [details];

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

  static fieldValidation(errors, message = "Validation failed") {
    return new ApiError(400, message, {
      exceptionType: "VALIDATION_EXCEPTION",
      details: errors,
    });
  }

  static notFound(message = "Not found") {
    return new ApiError(404, message, {
      exceptionType: "NOT_FOUND",
      details: [{ message }],
    });
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message, {
      exceptionType: "UNAUTHORIZED",
      details: [{ message }],
    });
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(403, message, {
      exceptionType: "FORBIDDEN",
      details: [{ message }],
    });
  }

  static conflict(message = "Conflict") {
    return new ApiError(409, message, {
      exceptionType: "CONFLICT",
      details: [{ message }],
    });
  }

  static serverError(message = "Internal server error") {
    return new ApiError(500, message, {
      exceptionType: "SERVER_EXCEPTION",
      details: [{ message }],
    });
  }
  static gatewayTimeout(message = "Gateway timeout", details = null) {
    return new ApiError(504, message, {
      exceptionType: "GATEWAY_TIMEOUT",
      details: [{ message }],
    });
  }
}

module.exports = { ApiError };
