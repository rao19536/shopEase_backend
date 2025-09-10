const UserService = require("../services/userService");

module.exports = {
  createUser: async (req, res, next) => {
    try {
      console.log("createUser payload:", req.body);
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      console.error("createUser error:", err);
      res.status(400).json({ error: err.message });
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (err) {
      console.error("getAllUsers error:", err);
      next(err);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (err) {
      console.error("getUserById error:", err);
      next(err);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (err) {
      console.error("updateUser error:", err);
      res.status(400).json({ error: err.message });
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const result = await UserService.deleteUser(req.params.id);
      res.json(result);
    } catch (err) {
      console.error("deleteUser error:", err);
      res.status(400).json({ error: err.message });
    }
  },
};
