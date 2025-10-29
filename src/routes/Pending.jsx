import { useState, useEffect } from "react";
import { getPendingSessions } from "../hooks/useAuth";
import SessionActions from "./SessionActions.jsx";

export default function PendingSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const sessionsData = await getPendingSessions();
      setSessions(sessionsData);
    } catch (error) {
      console.error("Failed to load sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading sessions...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pending Sessions</h1>
      {sessions.length === 0 ? (
        <p className="text-gray-500">No pending sessions</p>
      ) : (
        <div className="space-y-4">
          {sessions.map(session => (
            <div key={session._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{session.subject}</h3>
                  <p className="text-sm text-gray-600">
                    Student ID: {session.studentId}
                  </p>
                  <p className="text-sm">
                    {new Date(session.startTime).toLocaleString()} - 
                    {new Date(session.endTime).toLocaleString()}
                  </p>
                </div>
                <SessionActions session={session} onUpdate={loadSessions} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}