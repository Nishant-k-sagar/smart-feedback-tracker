import { useState } from 'react';

export default function FeedbackForm({ onAddFeedback }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General Feedback');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Title and description cannot be empty.");
      return;
    }
    setIsSubmitting(true);
    await onAddFeedback({ title, description, category });
    setTitle('');
    setDescription('');
    setCategory('General Feedback');
    setIsSubmitting(false);
  };

  return (
    <section className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 text-sky-500">Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium text-slate-500">Title</label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="A short summary" required className="w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500" />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1 font-medium text-slate-500">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the issue or idea" required rows="4" className="w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block mb-1 font-medium text-slate-500">Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500">
            <option>General Feedback</option>
            <option>Bug Report</option>
            <option>Feature Request</option>
            <option>Complaint</option>
            <option>Other</option>
          </select>
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded-md font-bold transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed">
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </section>
  );
}