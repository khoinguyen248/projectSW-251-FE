import { useState } from "react";
import { scheduleSession } from "../hooks/useAuth";

export default function TestScheduleSession() {
  const [form, setForm] = useState({
    tutorId: "68ed03028bfd1e9afe8ee4f6", // ID của Nguyễn Minh Khôi
    subject: "Mathematics",
    startTime: "",
    endTime: ""
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Tạo thời gian mặc định (1 tiếng từ bây giờ)
  const setDefaultTimes = () => {
    const now = new Date();
    const start = new Date(now.getTime() + 60 * 60 * 1000); // 1 giờ sau
    const end = new Date(start.getTime() + 60 * 60 * 1000); // 2 giờ sau
    
    setForm(prev => ({
      ...prev,
      startTime: start.toISOString().slice(0, 16),
      endTime: end.toISOString().slice(0, 16)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    console.log("🔄 Submitting session form:", form);

    try {
      // Convert to ISO string for backend
      const payload = {
        ...form,
        startTime: new Date(form.startTime).toISOString(),
        endTime: new Date(form.endTime).toISOString()
      };

      console.log("📤 Sending payload:", payload);

      const response = await scheduleSession(payload);
      
      console.log("✅ Session created:", response);
      
      setResult({ 
        success: true, 
        message: `Session scheduled successfully! ID: ${response.sessionId}` 
      });
      
      // Reset form
      setForm(prev => ({
        ...prev,
        subject: "",
        startTime: "",
        endTime: ""
      }));

    } catch (error) {
      console.error("❌ Schedule session error:", error);
      
      let errorMessage = error.message;
      if (error.response?.data) {
        errorMessage = `${error.response.data.message} - ${JSON.stringify(error.response.data)}`;
      }
      
      setResult({ 
        success: false, 
        message: errorMessage 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Test Schedule Session</h2>
      
      <div className="mb-4 p-3 bg-blue-50 rounded">
        <p className="text-sm">
          <strong>Tutor ID mẫu:</strong> 68ed03028bfd1e9afe8ee4f6 (Nguyễn Minh Khôi)
        </p>
      </div>

      <button
        onClick={setDefaultTimes}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
      >
        Set Default Times (1 hour from now)
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tutor ID *</label>
          <input
            type="text"
            required
            value={form.tutorId}
            onChange={(e) => setForm(prev => ({...prev, tutorId: e.target.value}))}
            className="w-full p-2 border rounded"
            placeholder="Enter tutor ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subject *</label>
          <input
            type="text"
            required
            value={form.subject}
            onChange={(e) => setForm(prev => ({...prev, subject: e.target.value}))}
            className="w-full p-2 border rounded"
            placeholder="Mathematics, Physics, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Time *</label>
          <input
            type="datetime-local"
            required
            value={form.startTime}
            onChange={(e) => setForm(prev => ({...prev, startTime: e.target.value}))}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">End Time *</label>
          <input
            type="datetime-local"
            required
            value={form.endTime}
            onChange={(e) => setForm(prev => ({...prev, endTime: e.target.value}))}
            className="w-full p-2 border rounded"
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          {loading ? "Scheduling..." : "Schedule Session"}
        </button>
      </form>

      {result && (
        <div className={`mt-4 p-3 rounded ${
          result.success 
            ? "bg-green-100 text-green-700 border border-green-300" 
            : "bg-red-100 text-red-700 border border-red-300"
        }`}>
          <strong>{result.success ? "✅ Success" : "❌ Error"}:</strong> {result.message}
        </div>
      )}

      {/* Debug info */}
      <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
        <strong>Debug Info:</strong>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div>
    </div>
  );
}