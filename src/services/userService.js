const { User, Product } = require("../database/models");

class UserService {
  static async createUser({ name, email, password }) {
    // You can later add hashing for password here
    return User.create({ name, email, password });
  }

  static async getAllUsers() {
    return User.findAll({
      include: { model: Product, as: "products" }, // fetch products along with users
    });
  }

  static async getUserById(id) {
    return User.findByPk(id, {
      include: { model: Product, as: "products" },
    });
  }

  static async updateUser(id, updates) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    return user.update(updates);
  }

  static async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.destroy();
    return { message: "User deleted" };
  }
}

module.exports = UserService;
