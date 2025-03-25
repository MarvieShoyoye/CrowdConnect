import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event", // Reference to the Event model
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // User who left the review
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1, // Minimum rating value (1-star)
    max: 5, // Maximum rating value (5-star)
  },
  reviewText: {
    type: String,
    required: false, // Optional review text
    trim: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Users who liked the review
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
