const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get active service
exports.getActiveService = async (req, res) => {
  const { userId } = req.params;

  try {
    const activeService = await prisma.service.findFirst({
      where: {
        userId: parseInt(userId),
        status: "active",
        endDate: {
          gte: new Date(),
        },
      },
    });

    if (!activeService) {
      return res.status(404).json({ msg: "No active service found" });
    }

    res.json(activeService);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Fetch services
exports.getServices = async (req, res) => {
  const { userId } = req.params;

  try {
    const services = await prisma.service.findMany({ where: { userId } });
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Fetch service history
exports.getServiceHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const history = await prisma.serviceHistory.findMany({ where: { userId } });
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete service
exports.deleteServiceHistory = async (req, res) => {
  const { id } = req.params;

  try {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    const service = await prisma.service.findUnique({
      where: { id: parsedId },
    });

    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }

    const deletedService = await prisma.service.delete({
      where: { id: parsedId },
    });

    res.json({ msg: "Service deleted successfully", deletedService });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
