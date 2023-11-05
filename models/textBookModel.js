const mongoose = require("mongoose");
const slugify = require("slugify");

const textBookSchema = new mongoose.Schema({
  medium: {
    type: String,
    enum: ["sinhala", "tamil", "english"],
    default: "sinhala",
  },
  type: {
    type: String,
    enum: ["textbook", "syllabus", "teachers guide"],
    default: "textbook",
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

const TextBook = mongoose.model("TextBook", textBookSchema);

module.exports = TextBook;
