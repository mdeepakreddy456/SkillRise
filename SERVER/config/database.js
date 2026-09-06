const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    if (!process.env.MONGODB_URL) {
        console.error("MONGODB_URL environment variable is missing.");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log("DB Connected Successfully");
    } catch (error) {
        console.error("DB Connection Failed:", error.message);
    }
};