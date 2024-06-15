const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (id) {
  const payload = {
    user: id,
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
};
