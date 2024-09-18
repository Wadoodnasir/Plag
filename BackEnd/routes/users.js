const express = require("express");
const router = express.Router();
const _ = require("lodash");
const logger = require("../utils/logger");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/* GET users listing. */
router.get("/profile", async function (req, res, next) {
  try {
    let makeJsonResponse = {};

    // get user profile from his session
    const user = req.session.user;
    const { id, email } = user;

    makeJsonResponse = { id, email };

    const profile = await prisma.profile.findUnique({
      where: { userId: id },
    });

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    const profileWithoutId = _.omit(profile, ["id", "userId"]);

    makeJsonResponse = { ...makeJsonResponse, ...profileWithoutId };

    res.json(makeJsonResponse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
