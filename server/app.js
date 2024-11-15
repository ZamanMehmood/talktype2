// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");
// const multer = require("multer");

// // Initialize the app
// const app = express();

// const Router = require("./routes/api");
// const connectDB = require("./config/database");
// const { connect } = require("http2");

// // Set up storage with Multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// // Serve static files from 'uploads' directory
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// // Image upload endpoint
// app.post("/api/upload", upload.single("image"), (req, res) => {
//   try {
//     const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
//       req.file.filename
//     }`;
//     res.status(200).json({ imageUrl });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to upload image" });
//   }
// });

// // Middleware
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true, // If you need to send cookies
//   })
// );
// app.use(bodyParser.json());

// // Connect to DB
// connectDB();

// app.set("trust proxy", true);

// // Use Router
// app.use("/api", Router);

// // Define Static folder
// app.use(express.static(path.join(__dirname, "public")));

// module.exports = app;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

// Initialize the app
const app = express();

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // If you need to send cookies
  })
);

// Set up storage with Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Serve static files from 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Image upload endpoint
app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// Middleware
app.use(bodyParser.json());

// Connect to DB
const connectDB = require("./config/database");
connectDB();

app.set("trust proxy", true);

// Use Router
const Router = require("./routes/api");
app.use("/api", Router);

// Define Static folder
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
