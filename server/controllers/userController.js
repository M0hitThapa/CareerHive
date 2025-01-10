import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
  
    // Create a new user
    const user = new User({
      name,
      email,
      password, // Password will be hashed by the pre-save middleware in the User model
    });
  
    // Save user to the database
    await user.save();
  
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d", // The token will expire in 30 days
    });
  
    // Return response with success message and token
    return res.status(201).json({ message: "User registered successfully", token });
  });

// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if password is correct
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return res.status(200).json({ message: "Login successful", token });
});

// Get User Profile (protected)
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(user);
});
