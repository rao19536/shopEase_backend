const UserService = require("../services/user.service");
const { ApiError } = require("../utils/ApiError");
const { created, updated, deleted, ok } = require("../utils/http");

module.exports = {
  create: async (req, res, next) => {
    try {
      const user = await UserService.createUser(req.body);
      return res
        .status(201)
        .json(created(user, "User created successfully", req.originalUrl));
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        throw ApiError.validation([
          { message: "Email already exists", path: ["email"] },
        ]);
      }
      next(err);
    }
  },

  findAll: async (req, res, next) => {
    try {
      const users = await UserService.getAllUsers();
      return res.json(ok(users, "OK", req.originalUrl));
    } catch (e) {
      next(e);
    }
  },

  findById: async (req, res, next) => {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user)
        throw new ApiError(404, "User not found", {
          exceptionType: "NOT_FOUND",
        });
      return res.json(ok(user, "OK", req.originalUrl));
    } catch (e) {
      next(e);
    }
  },

  update: async (req, res, next) => {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      return res.json(
        updated(user, "User updated successfully", req.originalUrl)
      );
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        throw ApiError.validation([
          { message: "Email already exists", path: ["email"] },
        ]);
      }
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      await UserService.deleteUser(req.params.id);
      return res.json(deleted("User deleted successfully", req.originalUrl));
    } catch (e) {
      next(e);
    }
  },
};
