const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getProfile,
  updateProfile
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const upload =
  require("../middleware/upload");

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Get Profile
router.get("/me", protect, getProfile);

// ==============================
// UPDATE PROFILE & COVER PHOTO
// ==============================
router.put(
  "/update-profile",
  protect,

  upload.fields([
    {
      name: "profilePic",
      maxCount: 1
    },
    {
      name: "coverPic",
      maxCount: 1
    }
  ]),

  updateProfile
);

module.exports = router;