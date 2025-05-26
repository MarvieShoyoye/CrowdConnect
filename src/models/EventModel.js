import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model (organizer)
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Music",
      "Art",
      "Tech",
      "Sports",
      "Education",
      "Business",
      "Food",
      "Other",
    ],
    default: "Other",
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
    default: 0, // 0 for free events
  },
  totalTickets: {
    type: Number,
    required: true,
  },
  ticketsSold: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String, // URL to event poster/banner
    default: "",
  },
  tags: {
    type: [String], // Array of keywords/tags for search
    default: [],
  },
  status: {
    type: String,
    enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
    default: "Upcoming",
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

const Event = mongoose.model("Event", eventSchema);

export default Event;
