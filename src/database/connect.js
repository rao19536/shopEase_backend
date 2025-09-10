const db = require("./models");

async function testConnection() {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Database connection authenticated.");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}

module.exports = { db, testConnection };
