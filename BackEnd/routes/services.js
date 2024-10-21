const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

router.get("/active/:userId", serviceController.getActiveService);
router.get("/services/:userId", serviceController.getServices);
router.get("/service-history/:userId", serviceController.getServiceHistory);
router.delete("/service-history/:id", serviceController.deleteServiceHistory);
router.post("/purchase", serviceController.purchaseService);

module.exports = router;
