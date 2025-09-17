const express = require("express");
const { testConnection } = require("./database/connect");
const routes = require("./routes");
const app = express();

async function startServer() {
  try {
    await testConnection();

    // Middlewares
    app.use(express.json());
    app.use((req, res, next) => {
      console.log(
        `[Request] ${req.method} ${req.url} - body: ${JSON.stringify(req.body)}`
      );
      next();
    });

    // Routes
    routes(app);

    // Start the server after DB connection
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (err) {
    console.error("❌ Failed to start the server due to database issues:", err);
    process.exit(1); // Exit the process if DB connection fails
  }
}

startServer();

module.exports = app;
