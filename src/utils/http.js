const now = () => new Date().toISOString();

const ok = (data, message = "OK", path) => ({
  error: false,
  statusCode: 200,
  message,
  data,
  timestamp: now(),
  path,
});

const created = (data, message = "Created", path) => ({
  error: false,
  statusCode: 201,
  message,
  data,
  timestamp: now(),
  path,
});

const updated = (data, message = "Updated successfully", path) => ({
  error: false,
  statusCode: 200,
  message,
  data,
  timestamp: now(),
  path,
});

const deleted = (message = "Deleted successfully", path) => ({
  error: false,
  statusCode: 200,
  message,
  data: null,
  timestamp: now(),
  path,
});

const fail = (statusCode, message, { errors, exceptionType, path } = {}) => ({
  error: true,
  statusCode,
  message,
  errors,
  exceptionType,
  timestamp: now(),
  path,
});

const validationError = (errors, path) =>
  fail(400, "Validation failed", { errors, exceptionType: "VALIDATION_EXCEPTION", path });

const serverError = (message = "Internal server error", path) =>
  fail(500, message, { exceptionType: "SERVER_EXCEPTION", path });

module.exports = { ok, created, updated, deleted, fail, validationError, serverError };
