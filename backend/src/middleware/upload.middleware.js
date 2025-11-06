const multer = require ("multer")
const { CloudinaryStorage } = require ("multer-storage-cloudinary")
const cloudinary = require ("../config/cloudinary.js")

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "foodbridge_uploads", // or project-specific name
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 400, height: 400, crop: "fill" }],
  },
});

const upload = multer({ storage });

module.exports = upload;
