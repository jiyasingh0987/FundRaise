
const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  refreshAccessToken
} = require("../controllers/authController");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Refresh Token
router.post("/refresh", refreshAccessToken);

module.exports = router;
