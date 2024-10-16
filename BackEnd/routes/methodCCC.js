const express = require("express");
const {
  createMethod,
  getMethods,
  updateMethod,
  deleteMethod,
  createCCC,
  getCCCs,
  updateCCC,
  deleteCCC,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/method", createMethod);
router.get("/method", getMethods);
router.put("/method/:id", updateMethod);
router.delete("/method/:id", deleteMethod);

router.post("/ccc", createCCC);
router.get("/ccc", getCCCs);
router.put("/ccc/:id", updateCCC);
router.delete("/ccc/:id", deleteCCC);

module.exports = router;
