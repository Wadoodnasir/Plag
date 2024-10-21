const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// GET profile by userId
const getProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: parseInt(userId) },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
};

// UPDATE profile by userId
const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const {
    firstName,
    lastName,
    profession,
    country,
    address,
    location,
    phone,
    email,
    website,
    linkedin,
    twitter,
    facebook,
    github,
    avatar,
    isDefaultAddress,
  } = req.body;

  try {
    const updatedProfile = await prisma.profile.update({
      where: { userId: parseInt(userId) },
      data: {
        firstName,
        lastName,
        profession,
        country,
        address,
        location,
        phone,
        email,
        website,
        linkedin,
        twitter,
        facebook,
        github,
        avatar,
        isDefaultAddress,
      },
    });

    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: "Error updating profile" });
  }
};

module.exports = { getProfile, updateProfile };
