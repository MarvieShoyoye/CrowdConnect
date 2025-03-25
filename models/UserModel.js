import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["organizer", "attendee", "admin"],
    default: "attendee",
  },
  profileImage: {
    type: String, // URL to profile image
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  socialLinks: {
    type: [String], // Array of URLs
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
