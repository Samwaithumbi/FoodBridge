// backend/config/cloudinary.js
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Test configuration on startup
console.log("🌥️  Cloudinary Configuration:");
console.log("   Cloud Name:", process.env.CLOUDINARY_NAME ? "✅" : "❌ MISSING");
console.log("   API Key:", process.env.CLOUDINARY_API_KEY ? "✅" : "❌ MISSING");
console.log("   API Secret:", process.env.CLOUDINARY_API_SECRET ? "✅" : "❌ MISSING");

if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("❌ ERROR: Cloudinary credentials are missing in .env file!");
}

module.exports = cloudinary;