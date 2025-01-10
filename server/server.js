import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connect from "./db/connect.js";
import fs from "fs";
import User from "./models/UserModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to parse cookies
app.use(cookieParser());

// CORS setup
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// Middleware for JSON request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JWT Authentication Middleware
const protect = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1]; // Token in the "Authorization" header

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user info to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// User login route (Generate JWT)
app.post("/api/v1/login", asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Create JWT payload
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  // Generate JWT token
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({
    message: "Login successful",
    token,
  });
}));

// Ensure user exists in DB middleware
const ensureUserInDB = asyncHandler(async (user) => {
  try {
    const existingUser = await User.findOne({ email: user.email });

    if (!existingUser) {
      const newUser = new User({
        email: user.email,
        name: user.name,
        role: "jobseeker",
      });

      await newUser.save();
      console.log("User added to db:", user);
    } else {
      console.log("User already exists in db:", existingUser);
    }
  } catch (error) {
    console.log("Error checking user in DB:", error.message);
  }
});

// Routes setup
const routeFiles = fs.readdirSync("./routes");

routeFiles.forEach((file) => {
  import(`./routes/${file}`).then((route) => {
    app.use("/api/v1/", route.default);
  }).catch((error) => {
    console.log("Error importing route:", error);
  });
});

// Server start
const server = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Server error:", error.message);
    process.exit(1);
  }
};

server();
