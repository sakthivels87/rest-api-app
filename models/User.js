const mongoose = require("mongoose");
const joi = require("joi");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
});

function validateUser(user) {
  const schema = joi.object({
    name: joi.string().min(3).max(150).required(),
    age: joi.number().min(18).max(110).required(),
    email: joi.email().required(),
    password: joi.string().min(10).max(250).required(),
  });

  return schema.validate(user, schema);
}

const User = mongoose.model("User", userSchema);
module.exports = User;
exports.validate = validateUser;
