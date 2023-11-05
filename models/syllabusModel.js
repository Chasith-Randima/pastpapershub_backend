const mongoose = require("mongoose");
const slugify = require("slugify");

const syllabusSchema = new mongoose.Schema({
  medium: {
    type: String,
    enum: ["sinhala", "tamil", "english"],
    default: "sinhala",
  },
  subject: {
    type: String,
    required: [true, "Text Book must have a subject"],
  },
  year: {
    type: String,
    required: [true, "Text Book must have a year"],
  },
  driveLink: {
    type: String,
    required: [true, "Text Book must have a pdf"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Syllabus = mongoose.model("Syllabus", syllabusSchema);

module.exports = Syllabus;
