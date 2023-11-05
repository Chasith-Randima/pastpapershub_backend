const mongoose = require("mongoose");
const slugify = require("slugify");

const paperSchema = new mongoose.Schema({
  examType: {
    type: String,
    enum: ["A/L Exam", "O/L Exam", "Grade 5 Scholarship Exam"],
    default: "A/L Exam",
  },
  medium: {
    type: String,
    enum: ["sinhala", "tamil", "english"],
    default: "A/L Exam",
  },
  stream: {
    type: String,
    required: [true, "paper must have a stream"],
  },
  subject: {
    type: String,
    required: [true, "Paper must have a subject"],
  },
  year: {
    type: String,
    required: [true, "paper must have a year"],
  },
  qPart1: {
    type: String,
    required: [true, "Paper must have a pdf"],
  },
  qPart2: {
    type: String,
  },
  mScheme1: {
    type: String,
  },
  mScheme2: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Paper = mongoose.model("Paper", paperSchema);

module.exports = Paper;
