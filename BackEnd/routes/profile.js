const express = require("express");
const router = express.Router();
const {
  updateProfile,
  getProfile,
} = require("../controllers/profileController");

// GET Profile
router.get("/:userId", getProfile);

// UPDATE Profile
router.put("/:userId", updateProfile);

module.exports = router;
