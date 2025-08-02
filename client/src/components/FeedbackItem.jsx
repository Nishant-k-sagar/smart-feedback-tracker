// client/src/components/FeedbackItem.jsx

import { useState } from 'react';

export default function FeedbackItem({ feedback, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(feedback.title);
  const [editedDescription, setEditedDescription] = useState(feedback.description);

  const handleSave = () => {
    onUpdate(feedback._id, { title: editedTitle, description: editedDescription });
    setIsEditing(false);
  };

  const getCategoryClass = (category) => {
    switch (category) {
      case 'Bug Report': return 'bg-red-500/20 text-red-300';
      case 'Feature Request': return 'bg-blue-500/20 text-blue-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const wasEdited = new Date(feedback.updatedAt) - new Date(feedback.createdAt) > 10000;

  if (isEditing) {
    return (
      <div className="bg-slate-700 p-4 rounded-lg shadow-md border border-sky-500 space-y-3">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full p-2 bg-slate-800 rounded-md border border-slate-600 text-lg font-bold"
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          rows="3"
          className="w-full p-2 bg-slate-800 rounded-md border border-slate-600"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded-md text-sm">Cancel</button>
          <button onClick={handleSave} className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded-md text-sm font-semibold">Save</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-md border border-slate-700 group">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-slate-100">{feedback.title}</h3>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getCategoryClass(feedback.category)}`}>
          {feedback.category}
        </span>
      </div>
      <p className="text-slate-400">{feedback.description}</p>
      <div className="flex justify-between items-end mt-3">
        <p className="text-xs text-slate-500">
          {wasEdited && <span className="italic">edited </span>}
          {new Date(wasEdited ? feedback.updatedAt : feedback.createdAt).toLocaleString()}
        </p>
        <div className="flex space-x-2 opacity-100 transition-opacity">
          <button onClick={() => setIsEditing(true)} className="px-2 py-1 text-xs bg-sky-600 hover:bg-sky-500 rounded text-white">Edit</button>
          <button onClick={() => onDelete(feedback._id)} className="px-2 py-1 text-xs bg-red-600 hover:bg-red-500 rounded text-white">Delete</button>
        </div>
      </div>
    </div>
  );
}