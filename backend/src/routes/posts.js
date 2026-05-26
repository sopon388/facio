const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {
  createPost,
  getPosts,
  likePost,
  commentPost,
  deletePost
} = require("../controllers/postController");


// Create Post
router.post(
  "/create",
  protect,
  upload.single("image"),
  createPost
);


// Get All Posts
router.get("/", protect, getPosts);


// Like / Unlike Post
router.put(
  "/like/:id",
  protect,
  likePost
);


// Comment On Post
router.post(
  "/comment/:id",
  protect,
  commentPost
);


// Delete Post
router.delete(
  "/:id",
  protect,
  deletePost
);


module.exports = router;