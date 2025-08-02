// client/src/components/FeedbackList.jsx

import FeedbackItem from './FeedbackItem';

export default function FeedbackList({ feedbackList, isLoading, error, onDelete, onUpdate }) {
  if (error) { return <p className="text-center text-red-400">{error}</p>; }
  if (isLoading) { return <p className="text-center text-slate-400">Loading feedback...</p>; }
  if (feedbackList.length === 0) { return <p className="text-center text-slate-400">No feedback submitted yet.</p>; }

  return (
    <div className='p-4 rounded-2xl'>
        <section>
      <h2 className="text-2xl font-bold mb-4 text-sky-600">Latest Feedback</h2>
      <div className="space-y-4">
        {feedbackList.map((feedback) => (
          <FeedbackItem
            key={feedback._id}
            feedback={feedback}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </section>
    </div>
  );
}