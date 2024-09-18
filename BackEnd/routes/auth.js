const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const prisma = new PrismaClient();

// login route
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await prisma.auth.findUnique({ where: { email } });

      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      req.session.user = user;

      res.json({
        msg: "User logged in successfully",
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// register route
router.post(
  "/register",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await prisma.auth.findUnique({ where: { email } });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      user = await prisma.auth.create({
        data: {
          email,
          password: await bcrypt.hash(password, salt),
          role: "USER",
        },
      });

      await prisma.profile.create({
        data: {
          userId: user.id,
        },
      });

      res.json({ msg: "User registered successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// logout route
// router.get("/logout", (req, res) => {
//   if (req.session) {
//     req.session.destroy((err) => {
//       if (err) {
//         return res.status(500).json({ msg: "Server error" });
//       }
//       res.json({ msg: "User logged out successfully" });
//     });
//   } else {
//     res.status(400).json({ msg: "No active session" });
//   }
// });

// forgot password route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    let user = await prisma.auth.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // token generation
    const token = crypto.randomBytes(20).toString("hex");

    // token save
    await prisma.auth.update({
      where: { email },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000, // 1 hour from now
      },
    });

    // Send an email to the user with the link to reset their password
    // This is a placeholder and should be replaced with actual email sending logic
    console.log(`http://localhost:3000/auth/reset-password?token=${token}`);

    res.json({ msg: "Email sent" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// reset password route
router.post("/reset-password", async (req, res) => {
  const { newPassword } = req.body;

  const token = req.query.token;

  try {
    let user = await prisma.auth.findFirst({
      where: { resetPasswordToken: token },
    });

    if (!user || Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.auth.update({
      where: { email: user.email },
      data: {
        password: hashedPassword,
        resetPasswordToken: null, // Invalidate the token
        resetPasswordExpires: null,
      },
    });

    res.json({ msg: "Password reset successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
