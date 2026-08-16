const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {
  sendMessage,
  getMessages
} = require("../controllers/messageController");


// =========================
// SEND MESSAGE
// =========================
router.post(
  "/send/:id",
  protect,
  upload.single("file"),
  sendMessage
);


// =========================
// GET ALL MESSAGES
// =========================
router.get(
  "/:id",
  protect,
  getMessages
);


// =========================
// EXPORT ROUTER
// =========================
module.exports = router;