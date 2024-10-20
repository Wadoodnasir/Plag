const { PrismaClient } = require("@prisma/client");
const { verifyToken, isAdmin } = require("../middleware/auth-middleware");

const prisma = new PrismaClient();

//methods
exports.createMethod = [
  verifyToken,
  isAdmin,
  async (req, res) => {
    const { methodWebsite, access, multipleTaskRun } = req.body;

    try {
      const newMethod = await prisma.method.create({
        data: { methodWebsite, access, multipleTaskRun },
      });
      res.status(201).json(newMethod);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  },
];

exports.getMethods = [
  // verifyToken,
  // isAdmin,
  async (req, res) => {
    try {
      const methods = await prisma.method.findMany();
      res.json(methods);
      console.log(methods);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  },
];

exports.updateMethod = [
  verifyToken,
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    const { methodWebsite, access, multipleTaskRun, status } = req.body;

    try {
      const updatedMethod = await prisma.method.update({
        where: { methodId: parseInt(id) },
        data: { methodWebsite, access, multipleTaskRun, status },
      });
      res.json(updatedMethod);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  },
];

exports.deleteMethod = [
  verifyToken,
  isAdmin,
  async (req, res) => {
    const { id } = req.params;

    try {
      await prisma.method.delete({
        where: { methodId: parseInt(id) },
      });
      res.json({ message: "Method deleted successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  },
];

//CCC
exports.createCCC = [
  verifyToken,
  isAdmin,
  async (req, res) => {
    const { methodId, email, password, totalLimit, refreshLimit } = req.body;

    try {
      const newCCC = await prisma.ccc.create({
        data: { methodId, email, password, totalLimit, refreshLimit },
      });
      res.status(201).json(newCCC);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  },
];

exports.getCCCs = [
  // verifyToken,
  // isAdmin,
  async (req, res) => {
    try {
      const cccs = await prisma.cCC.findMany();
      res.json(cccs);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  },
];

exports.updateCCC = [
  verifyToken,
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    const {
      email,
      password,
      totalLimit,
      usedLimit,
      remaingingLimit,
      refreshLimit,
      status,
    } = req.body;

    try {
      const updatedCCC = await prisma.ccc.update({
        where: { accountId: parseInt(id) },
        data: {
          email,
          password,
          totalLimit,
          usedLimit,
          remaingingLimit,
          refreshLimit,
          status,
        },
      });
      res.json(updatedCCC);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  },
];

exports.deleteCCC = [
  verifyToken,
  isAdmin,
  async (req, res) => {
    const { id } = req.params;

    try {
      await prisma.ccc.delete({
        where: { accountId: parseInt(id) },
      });
      res.json({ message: "CCC deleted successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  },
];
