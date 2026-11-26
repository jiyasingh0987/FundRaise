
const express = require("express");
const router = express.Router();

const {
  getCreatorDashboard
} = require("../controllers/dashboardController");

const {
  getSupporterDashboard
} = require("../controllers/supporterDashboardController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Creator Dashboard
router.get(
  "/creator",
  protect,
  authorize("creator"),
  getCreatorDashboard
);

// Supporter Dashboard
router.get(
  "/supporter",
  protect,
  authorize("supporter"),
  getSupporterDashboard
);

module.exports = router;
