const multer = require ("multer")
const { CloudinaryStorage } = require ("multer-storage-cloudinary")
const cloudinary = require ("../config/cloudinary.js")

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "foodbridge_uploads", // or project-specific name
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

module.exports = upload;
