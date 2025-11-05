class ApiError extends Error {
  constructor(statusCode, message, { exceptionType, details } = {}) {
    super(message);
    this.statusCode = statusCode;
    this.exceptionType = exceptionType;
    this.details = details;
    Error.captureStackTrace?.(this, this.constructor);
  }

  static validation(details, message = "Validation failed") {
    return new ApiError(400, message, { exceptionType: "VALIDATION_EXCEPTION", details });
  }
}

module.exports = { ApiError };
