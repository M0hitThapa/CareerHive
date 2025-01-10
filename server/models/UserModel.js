import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    appliedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    role: {
      type: String,
      enum: ["jobseeker", "recruiter"],
      default: "jobseeker",
    },
    resume: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    bio: {
      type: String,
      default: "",
    },
    profession: {
      type: String,
      default: "Unemployed",
    },
    resetPasswordToken: String, // For password reset functionality
    resetPasswordExpire: Date,  // Expiration for password reset token
  },
  { timestamps: true }
);

// Method to check password match
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to hash password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  // Hash password
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);

export default User;
