const { Product, User } = require("../database/models");

module.exports = {
  createProduct: async ({
    name,
    description,
    price,
    stock = 0,
    image,
    userId,
  }) => {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return Product.create({ name, description, price, stock, image, userId });
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
    if (!product) throw new Error("Product not found");
    return product.update(updates);
  },

  deleteProduct: async (id) => {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");
    await product.destroy();
    return { message: "Product deleted" };
  },
};

