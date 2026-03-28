require("dotenv").config();
const mongoose = require("mongoose");
const dburi = process.env.DB_URI;
mongoose.connect(dburi);

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

module.exports = mongoose;
