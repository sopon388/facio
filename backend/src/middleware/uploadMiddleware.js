const multer = require("multer");

const {
  CloudinaryStorage
} = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");


// =========================
// CLOUDINARY STORAGE
// =========================
const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "social-media",

    resource_type: "auto",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
      "gif",

      "mp4",
      "mov",
      "avi",
      "mkv",
      "webm",

      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
      "txt",
      "zip"
    ],

    public_id:
      Date.now() +
      "-" +
      file.originalname
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9._-]/g, "")
  })
});


// =========================
// MULTER UPLOAD
// =========================
const upload = multer({
  storage,

  limits: {
    fileSize: 50 * 1024 * 1024 // 50 MB
  }
});

module.exports = upload;