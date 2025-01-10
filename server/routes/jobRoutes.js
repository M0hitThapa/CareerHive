import express from "express";
import { createJob, getJobs, getJobsByUser, searchJobs, likeJob, getJobById, deleteJob, applyJob } from "../controllers/jobController.js";
import protect from "../middleware/protect.js"; // Protect middleware for JWT validation

const router = express.Router();

router.post("/jobs", protect, createJob);           // Protected route to create a job
router.get("/jobs", getJobs);                        // Public route to get all jobs
router.get("/jobs/user/:id", protect, getJobsByUser);  // Protected route to get jobs by user
router.get("/jobs/search", searchJobs);              // Public route for job search
router.put("/jobs/apply/:id", protect, applyJob);    // Protected route to apply for a job
router.put("/jobs/like/:id", protect, likeJob);      // Protected route to like/unlike a job
router.get("/jobs/:id", protect, getJobById);        // Protected route to get a job by ID
router.delete("/jobs/:id", protect, deleteJob);      // Protected route to delete a job

export default router;
