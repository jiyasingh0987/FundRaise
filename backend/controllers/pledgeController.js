
const Pledge = require("../models/Pledge");
const Campaign = require("../models/Campaign");

// Create Pledge
const createPledge = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const { campaignId } = req.params;

    if (
      amount === undefined ||
      !Number.isFinite(Number(amount)) ||
      Number(amount) <= 0
    ) {
      return res.status(400).json({
        message: "Please enter a valid pledge amount"
      });
    }

    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found"
      });
    }

    if (campaign.status !== "approved") {
      return res.status(400).json({
        message: "You can only pledge to approved campaigns"
      });
    }

    if (new Date(campaign.deadline) < new Date()) {
      return res.status(400).json({
        message: "Campaign deadline has passed"
      });
    }

    if (campaign.raisedAmount + Number(amount) > campaign.goal) {
      return res.status(400).json({
        message: "Pledge amount exceeds remaining campaign goal"
      });
    }

    const pledge = await Pledge.create({
      amount: Number(amount),
      supporter: req.user.id,
      campaign: campaignId,
      status: "successful"
    });

    campaign.raisedAmount += Number(amount);
    await campaign.save();

    res.status(201).json({
      message: "Pledge successful (mock payment)",
      pledge
    });
  } catch (error) {
    next(error);
  }
};

// Get My Pledge History
const getMyPledges = async (req, res, next) => {
  try {
    const pledges = await Pledge.find({
      supporter: req.user.id
    })
      .populate("campaign", "title goal raisedAmount status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      totalPledges: pledges.length,
      pledges
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPledge,
  getMyPledges
};
