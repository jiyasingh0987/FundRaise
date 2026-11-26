
const express = require("express");
const router = express.Router();

const {
  createPledge,
  getMyPledges
} = require("../controllers/pledgeController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Create Pledge (Supporter only)
router.post("/:campaignId", protect, authorize("supporter"), createPledge);

// Get My Pledge History (Supporter only)
router.get("/my-pledges", protect, authorize("supporter"), getMyPledges);

module.exports = router;
