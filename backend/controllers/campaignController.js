
const Campaign = require("../models/Campaign");

// Create Campaign
const createCampaign = async (req, res, next) => {
  try {
    const { title, description, goal, category, deadline } = req.body;

    if (!title || !description || !goal || !category || !deadline) {
      return res.status(400).json({
        message: "Please fill all campaign details"
      });
    }

    const campaign = await Campaign.create({
      title,
      description,
      goal,
      category,
      deadline,
      creator: req.user.id
    });

    res.status(201).json({
      message: "Campaign created successfully",
      campaign
    });
  } catch (error) {
    next(error);
  }
};

// Get Approved Campaigns
const getCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({ status: "approved" })
      .populate("creator", "name email");

    res.status(200).json({ campaigns });
  } catch (error) {
    next(error);
  }
};

// Admin: Get Pending Campaigns
const getPendingCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({ status: "pending" })
      .populate("creator", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ campaigns });
  } catch (error) {
    next(error);
  }
};

// Update Own Campaign
const updateCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found"
      });
    }

    if (campaign.creator.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only update your own campaign"
      });
    }

    if (campaign.status !== "pending") {
      return res.status(400).json({
        message: "Only pending campaigns can be updated"
      });
    }

    const allowedFields = [
      "title",
      "description",
      "goal",
      "category",
      "deadline"
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        campaign[field] = req.body[field];
      }
    });

    await campaign.save();

    res.status(200).json({
      message: "Campaign updated successfully",
      campaign
    });
  } catch (error) {
    next(error);
  }
};

// Delete Own Campaign
const deleteCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found"
      });
    }

    if (campaign.creator.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only delete your own campaign"
      });
    }

    if (campaign.status !== "pending") {
      return res.status(400).json({
        message: "Only pending campaigns can be deleted"
      });
    }

    await campaign.deleteOne();

    res.status(200).json({
      message: "Campaign deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Approve or Reject Campaign
const updateCampaignStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid campaign status"
      });
    }

    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found"
      });
    }

    // Real-Time Notification
    const io = req.app.get("io");

    if (io) {
      io.emit("campaignStatusUpdated", {
        campaignId: campaign._id,
        title: campaign.title,
        status: campaign.status,
        message: `Your campaign "${campaign.title}" has been ${status}.`
      });
    }

    res.status(200).json({
      message: `Campaign ${status} successfully`,
      campaign
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCampaign,
  getCampaigns,
  getPendingCampaigns,
  updateCampaign,
  deleteCampaign,
  updateCampaignStatus
};
