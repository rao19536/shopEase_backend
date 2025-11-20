const { ApiError } = require("./ApiError");

function mapError(err) {
  if (err.name === "SequelizeUniqueConstraintError") {
    const details = (err.errors || []).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return ApiError.conflict("Resource already exists", details);
  }

  if (err.name === "SequelizeValidationError") {
    const details = (err.errors || []).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return ApiError.validation(details);
  }

  if (err.code === "ETIMEDOUT" || err.name === "TimeoutError") {
    return ApiError.gatewayTimeout("Downstream service timed out");
  }

  if (err instanceof ApiError) return err;

  return ApiError.serverError();
}

module.exports = { mapError };
