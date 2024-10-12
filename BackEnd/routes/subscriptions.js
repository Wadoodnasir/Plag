const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

router.get("/active/:userId", subscriptionController.getActiveSubscription);
router.post("/", subscriptionController.createSubscription);
router.get("/:userId", subscriptionController.getUserSubscriptions);
router.put("/:subscriptionId", subscriptionController.updateSubscription);
router.delete("/:subscriptionId", subscriptionController.deleteSubscription);

module.exports = router;
