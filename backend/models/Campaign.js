
const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    goal: {
      type: Number,
      required: true,
      min: 1
    },
    raisedAmount: {
      type: Number,
      default: 0,
      min: 0
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Education",
        "Medical",
        "Environment",
        "Technology",
        "Community",
        "Other"
      ]
    },
    deadline: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "completed",
        "expired"
      ],
      default: "pending"
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

// MongoDB Indexes
campaignSchema.index({ creator: 1, createdAt: -1 });
campaignSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Campaign", campaignSchema);
