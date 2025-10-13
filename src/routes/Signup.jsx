// src/routes/Auth/Signup.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const [form, setForm] = useState({ 
    email: "", 
    password: "",
    role: "STUDENT" // THÊM ROLE MẶC ĐỊNH
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  // Sử dụng useEffect thay vì điều kiện trực tiếp
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setErr(""); 
    setOk("");
    
    try {
      await register(form);
      setOk("Account created!");
      // Đợi một chút để hiển thị thông báo thành công
      setTimeout(() => {
        navigate(from?.pathname || "/", { replace: true });
      }, 1000);
    } catch (e) {
      setErr(e.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Sign up</h1>
        
        {err && (
          <div className="mb-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {err}
          </div>
        )}
        
        {ok && (
          <div className="mb-3 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
            {ok}
          </div>
        )}
        
        <input
          className="border rounded w-full p-2 mb-3"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm(f => ({...f, email: e.target.value}))}
          required
        />
        
        <input
          className="border rounded w-full p-2 mb-3"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm(f => ({...f, password: e.target.value}))}
          required
          minLength={6}
        />
        
        {/* THÊM SELECT CHO ROLE */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            I am a:
          </label>
          <select
            className="border rounded w-full p-2"
            value={form.role}
            onChange={(e) => setForm(f => ({...f, role: e.target.value}))}
            required
          >
            <option value="STUDENT">Student</option>
            <option value="TUTOR">Tutor</option>
          </select>
        </div>
        
        <button 
          className="w-full py-2 rounded bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed" 
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
        
        <div className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}