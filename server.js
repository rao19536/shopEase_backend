require("dotenv").config();
const app = require("./src/app");
const { testConnection } = require("./src/database/connect");

const PORT = process.env.PORT || 4000;

(async function start() {
  try {
    await testConnection();
    const server = app.listen(PORT, () => {
      console.log(
        `✅ Server listening on port ${PORT} (env=${
          process.env.NODE_ENV || "development"
        })`
      );
    });

    process.on("unhandledRejection", (reason, p) => {
      console.error("❌ Unhandled Rejection at Promise", p, "reason:", reason);
    });
    process.on("uncaughtException", (err) => {
      console.error("❌ Uncaught Exception thrown:", err);
    });

    module.exports = server;
  } catch (err) {
    console.error("❌ Failed to start the server due to database issues:", err);
    process.exit(1);
  }
})();
