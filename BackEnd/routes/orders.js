const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Route to get all orders for an employee (user)
router.get("/:userId", orderController.getEmployeeOrders);
router.delete("/:orderId", orderController.deleteOrder);

module.exports = router;
