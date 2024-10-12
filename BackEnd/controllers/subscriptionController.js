const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get active subscription for a user
exports.getActiveSubscription = async (req, res) => {
  const { userId } = req.params;

  try {
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId: parseInt(userId),
        status: "active",
        endDate: {
          gte: new Date(),
        },
      },
      include: {
        package: true,
      },
    });

    if (!activeSubscription) {
      return res.status(404).json({ msg: "No active subscription found" });
    }

    res.json(activeSubscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Create a subscription
exports.createSubscription = async (req, res) => {
  const { userId, packageId } = req.body;

  try {
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        packageId,
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1 year duration
        status: "active",
      },
    });

    res.json(subscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get user subscriptions
exports.getUserSubscriptions = async (req, res) => {
  const { userId } = req.params;

  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { userId },
      include: { package: true },
    });

    res.json(subscriptions);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update subscription
exports.updateSubscription = async (req, res) => {
  const { subscriptionId } = req.params;
  const { status } = req.body;

  try {
    const updatedSubscription = await prisma.subscription.update({
      where: { id: parseInt(subscriptionId) },
      data: { status },
    });

    res.json(updatedSubscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete subscription
exports.deleteSubscription = async (req, res) => {
  const { subscriptionId } = req.params;

  try {
    await prisma.subscription.delete({
      where: { id: parseInt(subscriptionId) },
    });
    res.json({ msg: "Subscription deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
