
const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { protect, authorize } = require("../middleware/authMiddleware");

// Get logged-in user's profile
router.get("/profile", protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user
    });
  } catch (error) {
    next(error);
  }
});

// Creator-only route
router.get("/creator", protect, authorize("creator"), (req, res) => {
  res.status(200).json({ message: "Creator access granted" });
});

// Admin-only route
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.status(200).json({ message: "Admin access granted" });
});

module.exports = router;
