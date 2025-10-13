import { useState } from "react";
import { registerProgram } from "../hooks/useAuth";

export default function ProgramRegistration() {
  const [form, setForm] = useState({ programName: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerProgram(form);
      setMessage("Program registered successfully!");
      setForm({ programName: "", notes: "" });
    } catch (error) {
      setMessage("Failed to register program: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Register Program</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Program Name</label>
          <input
            type="text"
            required
            value={form.programName}
            onChange={(e) => setForm({...form, programName: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Advanced Mathematics"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({...form, notes: e.target.value})}
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Any additional requirements..."
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register Program"}
        </button>
      </form>
      {message && (
        <div className={`mt-4 p-3 rounded ${
          message.includes("Failed") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}