const express = require("express");
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs");
const authMiddleware = require("./src/middlewares/auth");

const app = express();
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobRouter);

module.exports = app;
