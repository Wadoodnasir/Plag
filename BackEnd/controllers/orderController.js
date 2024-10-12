const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fetch all orders
exports.getEmployeeOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await prisma.order.findMany({
      where: { userId: Number(userId) },
      orderBy: { createdAt: "desc" },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};
