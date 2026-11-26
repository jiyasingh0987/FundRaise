
const express = require("express");
const router = express.Router();

const {
  createCampaign,
  getCampaigns,
  getPendingCampaigns,
  updateCampaign,
  deleteCampaign,
  updateCampaignStatus
} = require("../controllers/campaignController");

const { getMyCampaigns } = require("../controllers/creatorCampaignController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Public: Get approved campaigns
router.get("/", getCampaigns);

// Admin: Get pending campaigns
router.get(
  "/pending",
  protect,
  authorize("admin"),
  getPendingCampaigns
);

// Creator: Get own campaigns
router.get(
  "/my-campaigns",
  protect,
  authorize("creator"),
  getMyCampaigns
);

// Creator: Create campaign
router.post("/", protect, authorize("creator"), createCampaign);

// Creator: Update own campaign
router.put("/:id", protect, authorize("creator"), updateCampaign);

// Creator: Delete own campaign
router.delete("/:id", protect, authorize("creator"), deleteCampaign);

// Admin: Approve or reject campaign
router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  updateCampaignStatus
);

module.exports = router;
