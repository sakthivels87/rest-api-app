function log(req, res, next) {
  console.log("Logging all the request");
  next();
}

module.exports = log;
