// src/routes/StudentDashboard.jsx
import { useState, useEffect } from "react";
import { getStudentSessions, joinSession, addFeedback } from "../hooks/useAuth";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, [activeTab]);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const sessionsData = await getStudentSessions(activeTab);
      setSessions(sessionsData);
    } catch (error) {
      console.error("Failed to load sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinSession = async (sessionId) => {
    try {
      const result = await joinSession(sessionId);
      window.open(result.meetingLink, '_blank');
    } catch (error) {
      alert("Cannot join session: " + error.message);
    }
  };

  const handleSubmitFeedback = async (sessionId, rating, comment) => {
    try {
      await addFeedback({ sessionId, rating, comment });
      alert("Feedback submitted successfully!");
      loadSessions(); // Reload to update UI
    } catch (error) {
      alert("Failed to submit feedback: " + error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Learning Dashboard</h1>
      
      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        {["upcoming", "completed", "pending"].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium capitalize ${
              activeTab === tab 
                ? "border-b-2 border-blue-500 text-blue-600" 
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} Sessions
          </button>
        ))}
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map(session => (
          <SessionCard 
            key={session._id}
            session={session}
            onJoinSession={handleJoinSession}
            onSubmitFeedback={handleSubmitFeedback}
          />
        ))}
      </div>
    </div>
  );
}

// Session Card Component
function SessionCard({ session, onJoinSession, onSubmitFeedback }) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({ rating: 5, comment: "" });

  const getStatusBadge = (status) => {
    const badges = {
      PENDING: "🟡 Pending",
      ACCEPTED: "🟢 Confirmed", 
      REJECTED: "🔴 Rejected",
      DONE: "✅ Completed",
      CANCELLED: "⚫ Cancelled"
    };
    return badges[status] || status;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{session.subject} with {session.tutorName}</h3>
          <p className="text-gray-600">
            {new Date(session.startTime).toLocaleString()} - {new Date(session.endTime).toLocaleString()}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          session.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
          session.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {getStatusBadge(session.status)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div>
          {session.meetingLink && (
            <p className="text-sm text-blue-600">Meeting: {session.meetingLink}</p>
          )}
        </div>
        
        <div className="flex space-x-2">
          {/* Join Session Button */}
          {session.status === 'ACCEPTED' && session.meetingLink && (
            <button
              onClick={() => onJoinSession(session._id)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Join Session
            </button>
          )}

          {/* Feedback Button */}
          {session.status === 'DONE' && !session.hasFeedback && (
            <button
              onClick={() => setShowFeedback(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit Feedback
            </button>
          )}
        </div>
      </div>

      {/* Feedback Form */}
      {showFeedback && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <h4 className="font-semibold mb-3">Session Feedback</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex space-x-1">
                {[1,2,3,4,5].map(star => (
                  <button
                    key={star}
                    onClick={() => setFeedback({...feedback, rating: star})}
                    className={`text-2xl ${star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Comments</label>
              <textarea
                value={feedback.comment}
                onChange={(e) => setFeedback({...feedback, comment: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                rows="3"
                placeholder="Share your experience with this tutor..."
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => onSubmitFeedback(session._id, feedback.rating, feedback.comment)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Submit Feedback
              </button>
              <button
                onClick={() => setShowFeedback(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}