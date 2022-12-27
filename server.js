const express = require("express");
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs");
const connect = require("./database/connect");
require("dotenv").config();

const app = express();

const PORT = 5000;

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobRouter);

const start = async () => {
  await connect(process.env.MONGO_URI);
  app.listen(PORT,() => {
    console.log(`you are listening on port ${PORT}`);
  });
};

start();


