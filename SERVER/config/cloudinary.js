const cloudinary = require("cloudinary").v2;
require("dotenv").config();
//Cloudinary is being required

exports.cloudinaryConnect = () => {
    try {
        if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
            console.warn("Cloudinary credentials missing or incomplete. Media upload features will require valid Cloudinary environment variables.");
            return;
        }
        
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
        
        console.log("Cloudinary connection established successfully");
    } catch(error) {
        console.error("Cloudinary connection error:", error);
    }
}