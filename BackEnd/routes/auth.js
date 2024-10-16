const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth-middleware");
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.get("/protected-route", verifyToken, (req, res) => {
  res.send(`Hello ${req.user.email}, you are authenticated!`);
});
router.post("/register", authController.register);
router.post("/forgot-password", authController.forgot);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
