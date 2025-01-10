import asyncHandler from "express-async-handler";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

// Create Job
export const createJob = asyncHandler(async (req, res) => {
  try {
    // Find the authenticated user using the JWT token
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { title, description, location, salary, jobType, tags, skills, salaryType, negotiable } = req.body;

    // Validate job data
    if (!title || !description || !location || !salary || !jobType || !tags || !skills) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new job
    const job = new Job({
      title,
      description,
      location,
      salary,
      jobType,
      tags,
      skills,
      salaryType,
      negotiable,
      createdBy: user._id,
    });

    // Save the job to the database
    await job.save();
    return res.status(201).json(job);
  } catch (error) {
    console.log("Error in createJob:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// Get All Jobs
export const getJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find({}).populate("createdBy", "name profilePicture").sort({ createdAt: -1 });
    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Error in getJobs:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// Get Jobs by User
export const getJobsByUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const jobs = await Job.find({ createdBy: user._id }).populate("createdBy", "name profilePicture");
    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Error in getJobsByUser:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// Apply for Job
export const applyJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (job.applicants.includes(user._id)) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    job.applicants.push(user._id);
    await job.save();

    return res.status(200).json(job);
  } catch (error) {
    console.log("Error in applyJob:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// Like a Job
export const likeJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isLiked = job.likes.includes(user._id);

    if (isLiked) {
      job.likes = job.likes.filter((like) => !like.equals(user._id));
    } else {
      job.likes.push(user._id);
    }

    await job.save();
    return res.status(200).json(job);
  } catch (error) {
    console.log("Error in likeJob:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// Get Job by ID
export const getJobById = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("createdBy", "name profilePicture");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.log("Error in getJobById:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// Delete Job
export const deleteJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user || job.createdBy.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this job" });
    }

    await job.deleteOne();
    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.log("Error in deleteJob:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// Search Jobs
export const searchJobs = asyncHandler(async (req, res) => {
  try {
    const { query } = req.query;  // Accept query parameter from request

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Search for jobs that match the query
    const jobs = await Job.find({
      $or: [
        { title: { $regex: query, $options: "i" } },  // Case-insensitive search for title
        { description: { $regex: query, $options: "i" } },  // Case-insensitive search for description
        { location: { $regex: query, $options: "i" } },  // Case-insensitive search for location
        { skills: { $regex: query, $options: "i" } }  // Case-insensitive search for skills
      ]
    }).populate("createdBy", "name profilePicture");

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found matching your search" });
    }

    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Error in searchJobs:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});
