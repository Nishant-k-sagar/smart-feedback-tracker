// server/routes/feedback.js

const express = require('express');
const router = express.Router();

// 1. Import the new controller functions
const {
  getFeedback,
  addFeedback,
  askAI,
  updateFeedback,
  deleteFeedback,
} = require('../controllers/feedbackController');

// Existing routes
router.get('/', getFeedback);
router.post('/', addFeedback);
router.post('/ask-ai', askAI);

// 2. Add the new routes for updating and deleting
router.put('/:id', updateFeedback);
router.delete('/:id', deleteFeedback);

module.exports = router;