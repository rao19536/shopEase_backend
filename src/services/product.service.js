const { Product, User } = require("../database/models");
const { ApiError } = require("../utils/ApiError");

module.exports = {
  createProduct: async (payload, userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw ApiError.notFound("User not found");
    if (user.status !== "SELLER")
      throw ApiError.forbidden(
        "Unauthorized user. Only seller can add products"
      );
    return Product.create({
      ...payload,
      userId,
    });
  },

  getAllProducts: async () => {
    return Product.findAll({
      include: { model: User, as: "user", attributes: ["id", "name", "email"] },
    });
  },

  getProductById: async (id) => {
    return Product.findByPk(id, {
      include: { model: User, as: "user", attributes: ["id", "name", "email"] },
    });
  },

  updateProduct: async (id, updates) => {
    const product = await Product.findByPk(id);
    if (!product) throw new ApiError("Product not found");
    return product.update(updates);
  },

  deleteProduct: async (id) => {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");
    await product.destroy();
    return { message: "Product deleted" };
  },
};
