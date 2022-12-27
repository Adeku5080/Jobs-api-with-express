const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");

const register = async (req, res) => {
try{
    const user = await User.create( {...req.body});
    res.status(StatusCodes.CREATED).json({user})
  } catch (err) {
    console.log(err)
  }
};

const login = async (req, res) => {
  try {
  } catch (err) {}
};

module.exports = { register, login };
