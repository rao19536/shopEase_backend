require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT} (env=${process.env.NODE_ENV || 'development'})`);
});

// safety logging for uncaught errors
process.on('unhandledRejection', (reason, p) => {
  console.error('❌ Unhandled Rejection at Promise', p, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception thrown:', err);
  // optionally exit in production
  // process.exit(1);
});

module.exports = server;
