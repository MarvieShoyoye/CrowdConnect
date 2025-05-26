import User from "../models/UserModel.js";
import generateToken from "../utils/generatetoken.js";
import argon2 from "argon2";

export const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Full name, email, and password are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await argon2.hash(password);

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id),
    },
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await argon2.verify(user.password, password)))
    return res.status(401).json({ message: "Invalid credentials" });

  res.status(200).json({
    message: "Login successful",
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    },
  });
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "_id fullName email role profilePhoto phoneNumber bio createdAt"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  const { fullName, email, profilePhoto, phoneNumber, bio } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Update only if fields are provided
  user.fullName = fullName || user.fullName;
  user.email = email || user.email;
  user.profilePhoto = profilePhoto || user.profilePhoto;
  user.phoneNumber = phoneNumber || user.phoneNumber;
  user.bio = bio || user.bio;

  await user.save();

  res.status(200).json({
    message: "Profile updated",
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePhoto: user.profilePhoto,
      phoneNumber: user.phoneNumber,
      bio: user.bio,
    },
  });
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.status(200).json({ message: "User deleted successfully" });
};
