const config = require("config");
const jwt = require("jsonwebtoken");

// Middleware that checks for token sent from front end
function auth(req, res, next) {
  // Check if token is present in header
  const token = req.header("x-auth-token");
  if (!token) res.status(401).json({ msg: "No token, unauthorized!" });

  // Verify token and decode
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Invalid token" });
  }
}

module.exports = auth;
