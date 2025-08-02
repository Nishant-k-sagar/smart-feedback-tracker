const Feedback = require('../models/Feedback');
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.addFeedback = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const newFeedback = new Feedback({ title, description, category });
    const feedback = await newFeedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the modified document
      runValidators: true, // Run schema validation
    });

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.json({ message: 'Feedback removed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


exports.askAI = async (req, res) => {
  const { question } = req.body;
  try {
    const allFeedback = await Feedback.find().limit(100).sort({ createdAt: -1 });
    if (allFeedback.length === 0) {
      return res.json({ answer: "There is no feedback data available to analyze yet." });
    }
    const feedbackContext = allFeedback.map(f => `Category: ${f.category}\nTitle: ${f.title}\nDescription: ${f.description}`).join('\n---\n');
    const prompt = `You are an AI assistant. Analyze the following feedback to answer the user's question concisely.\n\nUser's Question: "${question}"\n\n--- FEEDBACK DATA ---\n${feedbackContext}\n--- END DATA ---\n\nYour Answer:`;
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
    });
    res.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error with Groq API:', error);
    res.status(500).json({ message: 'Failed to get a response from the AI assistant.' });
  }
};