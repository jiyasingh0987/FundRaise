
const mongoose = require("mongoose");

const pledgeSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    supporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "successful", "failed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

// MongoDB Indexes
pledgeSchema.index({ supporter: 1, createdAt: -1 });
pledgeSchema.index({ campaign: 1 });

module.exports = mongoose.model("Pledge", pledgeSchema);
