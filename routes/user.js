const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = req.params;
  if (!user) return res.status(400).send("Bad request");
  const resp = await User.find();
  console.log("User Response: ", resp);
  res.status(200).send(resp);
});

router.post("/", async (req, res) => {
  const user = req.body;
  console.log("Received user from client: ", user);
  if (!user) return res.status(400).send("bad request");
  if (!User.validate(user)) return res.status(400).send("Invalid user");

  const resp = await new User(user).save().then(() => {
    console.log("New User is created!!!");
  });
  res.status(200).send(resp);
});

module.exports = router;
