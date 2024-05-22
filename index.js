const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const startUpDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const logger = require("./middleware/logger");
const auth = require("./middleware/authenticate");
const validator = require("./middleware/validate");
const home = require("./routes/home");
const course = require("./routes/course");
const user = require("./routes/user");
const express = require("express");
const morgan = require("morgan");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(logger);
app.use(auth);
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
      flags: "a",
    }),
  })
);

app.use(validator);
app.use("/api/courses", course);
app.use("/api/user", user);
app.use("/", home);

const port = process.env.PORT || 3200;

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startUpDebugger(config.get("appName"));
}

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then((res) => {
    console.log("Mongodb Connected");
    dbDebugger("Mongodb in localhost is connected successfully!!!");
  })
  .catch((err) => console.log("Error in connecting with mongodb", err));

app.listen(port, () => {
  dbDebugger(`Server is listening port ${port}`);
  console.log(`Server is successfully listening on port ${port}`);
});
