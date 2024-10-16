const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {});
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") return res.sendStatus(403);
  next();
};

module.exports = {
  generateToken,
  verifyToken,
  isAdmin,
};
