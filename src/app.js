const express = require("express");
const routes = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

app.use((req, _res, next) => {
  const body = { ...req.body };
  if (body.password) body.password = "***";
  if (body.confirmPassword) body.confirmPassword = "***";
  console.log(
    `[Request] ${req.method} ${req.originalUrl} - body: ${JSON.stringify(body)}`
  );
  next();
});

routes(app);

app.use((req, res) => {
  res.status(404).json({
    error: true,
    statusCode: 404,
    message: "Not Found",
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    exceptionType: "NOT_FOUND",
  });
});

app.use(errorHandler);

module.exports = app;
