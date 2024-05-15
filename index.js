const joi = require("joi");
const startUpDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const logger = require("./middleware/logger");
const auth = require("./middleware/authenticate");
const home = require("./routes/home");
const course = require("./routes/course");
const express = require("express");
const morgan = require("morgan");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(logger);
app.use(auth);
app.use("/api/courses", course);
app.use("/", home);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startUpDebugger(config.get("appName"));
}
const port = process.env.PORT || 3200;
app.listen(port, () => {
  dbDebugger(`Server is listening port ${port}`);
});
