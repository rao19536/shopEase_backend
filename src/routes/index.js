const userRoutes = require("./user.routes");
const productRoutes = require("./product.routes");
const authRoutes = require("./auth.routes");
const { authenticate } = require("../middlewares/auth.middleware");

module.exports = (app) => {
  app.get("/", (req, res) => res.json({ ok: true, message: "API running" }));

  app.use("/api/users", authenticate, userRoutes);
  app.use("/api/products", authenticate, productRoutes);
  app.use("/api/login", authRoutes);
};
