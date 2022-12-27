const express = require("express");
const authRouter = express.Router();
const { register, login } = require("../src/controllers/auth");

authRouter.route("/signIn").post(register);
authRouter.route("/login").post(login);

module.exports= authRouter;
