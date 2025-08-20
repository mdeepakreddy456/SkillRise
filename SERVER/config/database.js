const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Reduce timeout to 5 seconds
        heartbeatFrequencyMS: 2000,     // Check server status more frequently
    })
    .then(() => {
        console.log("DB Connected Successfully");
        // Log the connection state
        console.log("Connection State:", mongoose.connection.readyState);
    })
    .catch((error) => {
        console.log("DB Connection Failed");
        console.log("Error Details:");
        console.log("Error Name:", error.name);
        console.log("Error Message:", error.message);
        if (error.reason) {
            console.log("Error Reason:", error.reason);
        }
        // Check if the URL is properly formatted (remove sensitive parts before logging)
        const sanitizedUrl = process.env.MONGODB_URL ? 
            process.env.MONGODB_URL.replace(/(mongodb\+srv:\/\/)([^:]+):([^@]+)@/, '$1[username]:[password]@') : 
            'No URL found';
        console.log("MongoDB URL (sanitized):", sanitizedUrl);
        process.exit(1);
    });
};