const os = require("os");
const express = require("express");
const app = express();

const events = require('events');
events.EventEmitter.defaultMaxListeners = 20; 

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

const database = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
require("dotenv").config();

// Verify env variables are loaded
console.log("Environment variables loaded:");
console.log("CLOUD_NAME exists:", !!process.env.CLOUD_NAME);
console.log("API_KEY exists:", !!process.env.API_KEY);
console.log("API_SECRET exists:", !!process.env.API_SECRET);
console.log("FOLDER_NAME exists:", !!process.env.FOLDER_NAME);

const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

// Middlewares
app.use(async (req, res, next) => {
  await database.connect();
  next();
});
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, serverless)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        /\.vercel\.app$/.test(origin) ||
        process.env.CORS_ORIGIN === "*"
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Fallback: accept request
    },
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(),
  })
);

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// default request
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`The App is running at ${PORT}`);
  });
}

module.exports = app;