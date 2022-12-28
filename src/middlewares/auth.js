const User = require("../models/User");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ msg: "Authentication invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach the user to the job route
    req.user = { userId: payload.userId, name: payload.name };

    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = auth;
