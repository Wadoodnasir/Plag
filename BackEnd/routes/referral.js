const express = require("express");
const { getReferralLink } = require("../controllers/referralController");
const router = express.Router();

router.get("/referral-link", getReferralLink);
// router.get('/referral-link', authenticateToken, getReferralLink);

module.exports = router;
