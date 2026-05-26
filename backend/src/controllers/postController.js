const Post = require("../models/Post");


// Create Post
exports.createPost = async (req, res) => {
  try {

    const { text } = req.body;

    const image = req.file
      ? req.file.path
      : "";

    const post = await Post.create({
      user: req.user._id,
      text,
      image
    });

    const populatedPost = await Post.findById(post._id)
      .populate("user", "name profilePic");

    res.status(201).json({
      success: true,
      post: populatedPost
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// Get All Posts
exports.getPosts = async (req, res) => {
  try {

    const posts = await Post.find()
      .populate("user", "name profilePic")
      .populate("comments.user", "name profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// Like Post
exports.likePost = async (req, res) => {
  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    const alreadyLiked = post.likes.includes(req.user._id);

    if (alreadyLiked) {

      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );

    } else {

      post.likes.push(req.user._id);
    }

    await post.save();

    res.status(200).json({
      success: true,
      likes: post.likes.length
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// Comment Post
exports.commentPost = async (req, res) => {
  try {

    const { text } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    post.comments.push({
      user: req.user._id,
      text
    });

    await post.save();

    res.status(201).json({
      success: true,
      comments: post.comments
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// Delete Post
exports.deletePost = async (req, res) => {
  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};