const userRoutes = require("./user.routes");
const productRoutes = require("./product.routes");

module.exports = (app) => {
  app.get("/", (req, res) => res.json({ ok: true, message: "API running" }));

  app.use("/api/users", userRoutes);
  app.use("/api/products", productRoutes);

  // 404 handler
  app.use((req, res) => res.status(404).json({ error: "Not Found" }));

  // Global error handler
  app.use((err, req, res, next) => {
    console.error("[Global Error Handler]", err);
    res
      .status(err.status || 500)
      .json({ error: err.message || "Internal Server Error" });
  });
};
