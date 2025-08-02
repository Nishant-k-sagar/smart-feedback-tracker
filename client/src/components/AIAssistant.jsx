import { useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
                                  
export default function AIAssistant() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setIsLoading(true);
    setAnswer('');
    try {
      const res = await axios.post(`${API_URL}/ask-ai`, { question });
      setAnswer(res.data.answer);
    } catch (error) {
      setAnswer('Sorry, something went wrong. Please try again.',error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-4 text-sky-500">🤖 AI Assistant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="e.g., What are users complaining about?" className="w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500" />
        <button type="submit" disabled={isLoading} className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 p-3 rounded-md font-bold transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed">
          {isLoading ? 'Thinking...' : 'Ask AI'}
        </button>
      </form>
      {answer && (
        <div className="mt-6 p-4 bg-slate-700/50 rounded-md border border-slate-600">
          <p className="text-slate-300 whitespace-pre-wrap font-mono">{answer}</p>
        </div>
      )}
    </div>
  );
}