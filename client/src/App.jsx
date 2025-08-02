import { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import AIAssistant from './components/AIAssistant';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/feedback';

function App() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeedback = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get(API_URL);
      setFeedbackList(res.data);
    } catch (err) {
      console.error("Failed to fetch feedback:", err);
      setError("Could not load feedback. Check your connection or try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const addFeedback = async (feedback) => {
    try {
      await axios.post(API_URL, feedback);
      fetchFeedback();
    } catch (err) {
      alert("Failed to submit feedback. Please try again.", err);
    }
  };

  const handleDeleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchFeedback(); // Refresh list after deleting
      } catch (error) {
        console.error("Failed to delete feedback:", error);
        alert("Failed to delete feedback. Please try again.");
      }
    }
  };


  const handleUpdateFeedback = async (id, updatedData) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedData);
      fetchFeedback(); // Refresh list after updating
    } catch (error) {
      console.error("Failed to update feedback:", error);
      alert("Failed to update feedback. Please try again.");
    }
  };

  return (
    <div className="font-sans bg-black">
      <div className="container mx-auto p-4 sm:p-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-sky-500">Smart Feedback Tracker</h1>
          <p className="text-white mt-2">Submit feedback and get AI-powered insights.</p>
        </header>
        <main className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div className="space-y-8">
            <FeedbackForm onAddFeedback={addFeedback} />
            <AIAssistant />
          </div>
          <div className="max-h-[80vh] overflow-y-auto pr-2">
            <FeedbackList
              feedbackList={feedbackList}
              isLoading={isLoading}
              error={error}
              onDelete={handleDeleteFeedback}
              onUpdate={handleUpdateFeedback}
            />
          </div>
        </main>
      </div>

      {/* Footer */}
    <footer className="text-center text-white py-4 border-t border-gray-700">
    All copyright © reserved | Made with <span className="text-red-500">❤️</span> by Nishant-K-Sagar
    </footer>
    </div>
  );
}

export default App;
