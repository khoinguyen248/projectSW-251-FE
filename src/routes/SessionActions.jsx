import { useState } from "react";
import { confirmSession } from "../hooks/useAuth";

export default function SessionActions({ session, onUpdate }) {
  const [action, setAction] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!action) return;
    
    setLoading(true);
    try {
      await confirmSession(session._id, {
        action,
        meetingLink: action === "ACCEPT" ? meetingLink : undefined
      });
      onUpdate(); // Refresh the list
    } catch (error) {
      console.error("Failed to update session:", error);
      alert("Failed to update session: " + error.message);
    } finally {
      setLoading(false);
      setAction("");
      setMeetingLink("");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <select
        value={action}
        onChange={(e) => setAction(e.target.value)}
        className="p-2 border rounded"
        disabled={loading}
      >
        <option value="">Select action</option>
        <option value="ACCEPT">Accept</option>
        <option value="REJECT">Reject</option>
      </select>
      
      {action === "ACCEPT" && (
        <input
          type="url"
          placeholder="Meeting link (Google Meet, Zoom...)"
          value={meetingLink}
          onChange={(e) => setMeetingLink(e.target.value)}
          className="p-2 border rounded text-sm"
        />
      )}
      
      {action && (
        <button
          onClick={handleConfirm}
          disabled={loading || (action === "ACCEPT" && !meetingLink)}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 text-sm"
        >
          {loading ? "Processing..." : "Confirm"}
        </button>
      )}
    </div>
  );
}