const ProductService = require("../services/product.service");
const { ApiError } = require("../utils/ApiError");
const { created, updated } = require("../utils/http");

module.exports = {
  create: async (req, res, next) => {
    try {
      const image = req.file?.path || null;
      const product = await ProductService.createProduct(
        { ...req.body, image },
        req.user.id
      );
      return res
        .status(200)
        .json(
          created(product, "Product created successfully", req.originalUrl)
        );
    } catch (err) {
      console.error("createProduct error:", err);
      next(err);
    }
  },

  findAll: async (req, res, next) => {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (err) {
      console.error("getAllProducts error:", err);
      next(err);
    }
  },

  findById: async (req, res, next) => {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) return ApiError.notFound("User not found");
      res.json(product);
    } catch (err) {
      console.error("getProductById error:", err);
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const image = req.file?.path || null;
      const product = await ProductService.updateProduct(req.params.id, {
        ...req.body,
        image,
      });
      res.json(
        updated(product, "Product updated successfully", req.originalUrl)
      );
    } catch (err) {
      console.error("updateProduct error:", err);
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const result = await ProductService.deleteProduct(req.params.id);
      res.json(result);
    } catch (err) {
      console.error("deleteProduct error:", err);
      res.status(400).json({ error: err.message });
    }
  },
};
