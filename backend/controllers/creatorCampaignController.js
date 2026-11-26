
const Campaign = require("../models/Campaign");

// Get Creator's Own Campaigns
const getMyCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({
      creator: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      campaigns
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyCampaigns };
