const express = require("express");
const { testConnection } = require("./src/database/connect");

const app = express();

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(
    `[Request] ${req.method} ${req.url} - body: ${JSON.stringify(req.body)}`
  );
  next();
});

// DB test
testConnection();

// Routes
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/products", require("./src/routes/productRoutes"));

// Health check
app.get("/", (req, res) => res.json({ ok: true, message: "API running" }));

// 404 handler
app.use((req, res) => res.status(404).json({ error: "Not Found" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error("[Global Error Handler]", err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

module.exports = app;
