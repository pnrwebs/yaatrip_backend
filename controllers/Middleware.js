const jwt = require("jsonwebtoken");

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @param {*} next any
 * @returns Middleware to authenticate JWT
 */

const authenticateJWT = (req, res, next) => {
  if (req.header("Authorization")) {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).send("Invalid token.");
    }
  } else {
    res.status(400).send("Token required.");
  }
};

module.exports = authenticateJWT;
