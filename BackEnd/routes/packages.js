const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

// Create subscription package detail
router.post("/subscription-package-detail", async (req, res) => {
  const { packageName, expiryDate, availableDocuments, cost, subscriptionId } =
    req.body;

  console.log("Request Body: ", req.body); // Check the incoming data
  try {
    const packageDetail = await prisma.subscriptionPackageDetail.create({
      data: {
        packageName,
        expiryDate: new Date(expiryDate),
        availableDocuments,
        cost,
        subscriptionId,
      },
    });
    console.log("Package Detail Created: ", packageDetail); // Check if creation succeeds
    res.status(201).json(packageDetail);
  } catch (error) {
    console.error("Error creating package detail: ", error);
    res
      .status(500)
      .json({ error: "Failed to create subscription package detail" });
  }
});

// Get subscription package details by ID
router.get("/subscription-package-detail/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const packageDetail = await prisma.subscriptionPackageDetail.findUnique({
      where: { id: parseInt(id) },
    });
    if (!packageDetail) {
      return res.status(404).json({ error: "Package detail not found" });
    }
    res.status(200).json(packageDetail);
  } catch (error) {
    console.error("Error fetching package detail: ", error);
    res
      .status(500)
      .json({ error: "Failed to fetch subscription package detail" });
  }
});

// Get all subscription package details
router.get("/subscription-package-details", async (req, res) => {
  try {
    const packageDetails = await prisma.subscriptionPackageDetail.findMany();
    res.status(200).json(packageDetails);
  } catch (error) {
    console.error("Error fetching package details: ", error);
    res
      .status(500)
      .json({ error: "Failed to fetch subscription package details" });
  }
});

module.exports = router;
