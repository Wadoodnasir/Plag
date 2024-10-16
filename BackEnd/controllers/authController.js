const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { generateToken } = require("../middleware/auth-middleware");

const prisma = new PrismaClient();

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.auth.findUnique({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials." });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid credentials." });
  }

  // Generate JWT token
  const token = generateToken(user);
  res.json({ token });
};
// Register function
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await prisma.auth.findUnique({ where: { email } });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await prisma.auth.create({
      data: { email, password: hashedPassword, role: "USER" },
    });

    await prisma.profile.create({ data: { userId: user.id } });

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
//forgot Password
exports.forgot = async (req, res) => {
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
};
//reset password
exports.resetPassword = async (req, res) => {
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
};
