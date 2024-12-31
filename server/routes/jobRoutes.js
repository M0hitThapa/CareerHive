import express from "express";

const router = express.Router();

router.post("/jobs", createJob);

export default router;