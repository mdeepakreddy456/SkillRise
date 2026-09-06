const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    if (!process.env.MONGODB_URL) {
        console.error("MONGODB_URL environment variable is missing.");
        return;
    }
    mongoose.connect(process.env.MONGODB_URL, {
        serverSelectionTimeoutMS: 5000,
        heartbeatFrequencyMS: 2000,
    })
    .then(() => {
        console.log("DB Connected Successfully");
        console.log("Connection State:", mongoose.connection.readyState);
    })
    .catch((error) => {
        console.log("DB Connection Failed");
        console.log("Error Name:", error.name);
        console.log("Error Message:", error.message);
        if (error.reason) {
            console.log("Error Reason:", error.reason);
        }
        const sanitizedUrl = process.env.MONGODB_URL ? 
            process.env.MONGODB_URL.replace(/(mongodb\+srv:\/\/)([^:]+):([^@]+)@/, '$1[username]:[password]@') : 
            'No URL found';
        console.log("MongoDB URL (sanitized):", sanitizedUrl);
        if (!process.env.VERCEL) {
            process.exit(1);
        }
    });
};