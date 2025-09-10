const ProductService = require("../services/productService");

module.exports = {
  createProduct: async (req, res, next) => {
    try {
      console.log("createProduct payload:", req.body);
      const product = await ProductService.createProduct(req.body);
      res.status(201).json(product);
    } catch (err) {
      console.error("createProduct error:", err);
      res.status(400).json({ error: err.message });
    }
  },

  getAllProducts: async (req, res, next) => {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (err) {
      console.error("getAllProducts error:", err);
      next(err);
    }
  },

  getProductById: async (req, res, next) => {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json(product);
    } catch (err) {
      console.error("getProductById error:", err);
      next(err);
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const product = await ProductService.updateProduct(req.params.id, req.body);
      res.json(product);
    } catch (err) {
      console.error("updateProduct error:", err);
      res.status(400).json({ error: err.message });
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const result = await ProductService.deleteProduct(req.params.id);
      res.json(result);
    } catch (err) {
      console.error("deleteProduct error:", err);
      res.status(400).json({ error: err.message });
    }
  },
};
