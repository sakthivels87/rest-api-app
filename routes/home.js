const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //res.send("Hello!!!, Welcome to express world!!!");
  res.render("index", {
    title: "Express Templating Engine",
    message: "Welcome to expressJS",
  });
});

module.exports = router;
