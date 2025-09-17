const { User, Product } = require("../database/models");

module.exports = {
  createUser: async ({ name, email, password }) => {
    // You can later add hashing for password here
    return User.create({ name, email, password });
  },

  getAllUsers: async () => {
    return User.findAll({
      include: { model: Product, as: "products" },
    });
  },

  getUserById: async (id) => {
    return User.findByPk(id, {
      include: { model: Product, as: "products" },
    });
  },

  updateUser: async (id, updates) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    return user.update(updates);
  },

  deleteUser: async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.destroy();
    return { message: "User deleted" };
  },
};

