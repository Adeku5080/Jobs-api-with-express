const mongoose = require("mongoose");

const connectDb = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
    })
    .then(() => console.log("db connection succesful"));
};

module.exports = connectDb;
