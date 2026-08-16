const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Text message
    text: {
      type: String,
      default: ""
    },

    // File URL from Cloudinary
    fileUrl: {
      type: String,
      default: ""
    },

    // File type: image, video, pdf, document, etc.
    fileType: {
      type: String,
      default: ""
    },

    // Original file name
    fileName: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Message", messageSchema);