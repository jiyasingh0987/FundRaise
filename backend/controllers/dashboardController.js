
const mongoose = require("mongoose");
const Campaign = require("../models/Campaign");

// Creator Dashboard
const getCreatorDashboard = async (req, res, next) => {
  try {
    const dashboard = await Campaign.aggregate([
      {
        $match: {
          creator: new mongoose.Types.ObjectId(req.user.id)
        }
      },
      {
        $group: {
          _id: null,
          totalCampaigns: { $sum: 1 },
          totalGoal: { $sum: "$goal" },
          totalRaised: { $sum: "$raisedAmount" }
        }
      },
      {
        $project: {
          _id: 0,
          totalCampaigns: 1,
          totalGoal: 1,
          totalRaised: 1
        }
      }
    ]);

    res.status(200).json({
      dashboard: dashboard[0] || {
        totalCampaigns: 0,
        totalGoal: 0,
        totalRaised: 0
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCreatorDashboard };
