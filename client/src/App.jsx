// client/src/App.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import AIAssistant from "./components/AIAssistant";

// This is our server's base URL, which is now correctly set.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

function App() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeedback = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // We now specifically request the /api/feedback endpoint
      const res = await axios.get(`${API_BASE_URL}/api/feedback`);
      setFeedbackList(res.data);
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
      setError(
        "Could not load feedback. Check your connection or try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const addFeedback = async (feedback) => {
    try {
      // We use the full endpoint path for POST requests as well
      await axios.post(`${API_BASE_URL}/api/feedback`, feedback);
      fetchFeedback();
    } catch (error) {
      alert("Failed to submit feedback. Please try again.", error);
    }
  };

  const handleDeleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/feedback/${id}`);
        fetchFeedback();
      } catch (error) {
        console.error("Failed to delete feedback:", error);
        alert("Failed to delete feedback. Please try again.");
      }
    }
  };

  const handleUpdateFeedback = async (id, updatedData) => {
    try {
      await axios.put(`${API_BASE_URL}/api/feedback/${id}`, updatedData);
      fetchFeedback();
    } catch (error) {
      console.error("Failed to update feedback:", error);
      alert("Failed to update feedback. Please try again.");
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans">
      <div className="container mx-auto p-4 sm:p-8">
        {/* <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-sky-400">FeedwizeX</h1>
          <p className="text-slate-400 mt-2">Submit feedback and get AI-powered insights.</p>
        </header> */}
        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-3">
            <img
              src="/FeedwizeX.png"
              alt="FeedwizeX Logo"
              className="w-12 h-12 sm:w-15 sm:h-15 bg-white rounded-md"
            />
            <h1 className="text-4xl sm:text-5xl font-bold text-sky-400">
              FeedwizeX
            </h1>
          </div>
          <p className="text-slate-400 mt-2">
            Submit feedback and get AI-powered insights.
          </p>
        </header>

        <main className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div className="space-y-8">
            <FeedbackForm onAddFeedback={addFeedback} />
            {/* The AIAssistant component needs the same fix */}
            <AIAssistant apiBaseUrl={API_BASE_URL} />
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
    </div>
  );
}

export default App;
