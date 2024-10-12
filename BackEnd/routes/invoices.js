const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");

router.get("/:userId", invoiceController.getInvoices);
router.post("/", invoiceController.createInvoice);

module.exports = router;
