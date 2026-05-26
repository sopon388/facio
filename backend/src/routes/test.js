const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");


// Test Upload Route
router.post(
  "/upload",

  upload.single("image"),

  (req, res) => {

    try {

      res.status(200).json({
        success: true,

        message: "Image Uploaded Successfully",

        imageUrl: req.file.path
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
);

module.exports = router;