const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); // Assuming you're using Prisma client

// Fetch or Create Referral Link for User
const getReferralLink = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user authentication and can access userId
    let referral = await prisma.referral.findUnique({
      where: { userId },
    });

    if (!referral) {
      // If no referral exists, generate one
      const referralCode = `ref_${Math.random().toString(36).substr(2, 9)}`;
      referral = await prisma.referral.create({
        data: {
          // userId,
          referralCode,
        },
      });
    }

    // Return the referral link
    const referralLink = `https://yourapp.com/referral/${referral.referralCode}`;
    res.status(200).json({ referralLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating referral link" });
  }
};

module.exports = {
  getReferralLink,
};
