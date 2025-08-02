const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Bug Report', 'Feature Request', 'General Feedback', 'Complaint', 'Other'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', FeedbackSchema);
