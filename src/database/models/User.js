const mongoose = require("mongoose");
const user = new mongoose.Schema({
  name: String,
  age: Number,
  level: String,
  email: String,
  phone: String,
  date: Date
});

module.exports = mongoose.model("User", user, 'users');