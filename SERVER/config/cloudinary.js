const cloudinary = require("cloudinary").v2;
require("dotenv").config();
//Cloudinary is being required

exports.cloudinaryConnect = () => {
    try{
        if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
            console.error("Cloudinary credentials are missing. Please check your .env file");
            console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
            console.log("API_KEY:", process.env.API_KEY ? "exists" : "missing");
            console.log("API_SECRET:", process.env.API_SECRET ? "exists" : "missing");
            throw new Error("Cloudinary credentials are missing");
        }
        
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
        
        console.log("Cloudinary connection established successfully");
    } catch(error) {
        console.error("Cloudinary connection error:", error);
        throw error;
    }
}