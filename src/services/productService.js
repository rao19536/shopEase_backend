const { Product, User } = require('../database/models');

class ProductService {
  static async createProduct({ name, description, price, stock = 0, image, userId }) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return Product.create({ name, description, price, stock, image, userId });
  }

  static async getAllProducts() {
    return Product.findAll({
      include: { model: User, as: "user", attributes: ["id", "name", "email"] },
    });
  }

  static async getProductById(id) {
    return Product.findByPk(id, {
      include: { model: User, as: "user", attributes: ["id", "name", "email"] },
    });
  }

  static async updateProduct(id, updates) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");
    return product.update(updates);
  }

  static async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");
    await product.destroy();
    return { message: "Product deleted" };
  }
}

module.exports = ProductService;
