// backend/config/multer.j
const multer = require('multer')
const { CloudinaryStorage } =require ("multer-storage-cloudinary");
const cloudinary = require ("./cloudinary");

// Define Cloudinary storage engine
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "foodbridge_donations", // name of folder on Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

module.exports= upload;
