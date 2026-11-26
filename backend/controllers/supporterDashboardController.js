
const Pledge = require("../models/Pledge");
const mongoose = require("mongoose");

const getSupporterDashboard = async (req, res, next) => {
  try {
    const supporterId = new mongoose.Types.ObjectId(req.user.id);

    const dashboard = await Pledge.aggregate([
      {
        $match: {
          supporter: supporterId,
          status: "successful"
        }
      },
      {
        $group: {
          _id: null,
          totalPledges: { $sum: 1 },
          totalContributed: { $sum: "$amount" },
          supportedCampaigns: { $addToSet: "$campaign" }
        }
      },
      {
        $project: {
          _id: 0,
          totalPledges: 1,
          totalContributed: 1,
          totalCampaignsSupported: {
            $size: "$supportedCampaigns"
          }
        }
      }
    ]);

    res.status(200).json({
      dashboard: dashboard[0] || {
        totalPledges: 0,
        totalContributed: 0,
        totalCampaignsSupported: 0
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSupporterDashboard };
