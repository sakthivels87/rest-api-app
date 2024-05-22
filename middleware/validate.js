module.exports = function (req, res, next) {
  console.log("validating the request");
  next();
};
