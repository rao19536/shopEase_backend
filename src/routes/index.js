const userRoutes = require("./user.routes");
const productRoutes = require("./product.routes");
const authRoutes = require("./auth.routes");
module.exports = (app) => {
  app.get("/", (req, res) => res.json({ ok: true, message: "API running" }));

  app.use("/api/users", userRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/login", authRoutes);
};
