// src/routes/Auth/Login.jsx
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  // Nếu đã đăng nhập, tự động về trang chủ (tránh vào lại login)
  if (user) {
    navigate("/", { replace: true });
  }

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
 const [showResendOption, setShowResendOption] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setErr("");
    setShowResendOption(false);
   try {
      await login(form);
      navigate(from?.pathname || "/", { replace: true });
    } catch (e) {
      const errorMessage = e.message || "Login failed";
      setErr(errorMessage);
      
      // Nếu lỗi là email chưa verify, hiển thị option resend
      if (errorMessage.includes("chưa xác thực") || errorMessage.includes("not verified")) {
        setShowResendOption(true);
        setUnverifiedEmail(form.email);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Log in</h1>
        
        {err && (
          <div className="mb-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {err}
          </div>
        )}
        
        {/* Resend verification option */}
        {showResendOption && (
          <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800 mb-2">
              Email của bạn chưa được xác thực.
            </p>
            <Link
              to="/resend-verification"
              state={{ email: unverifiedEmail }}
              className="text-sm text-blue-600 hover:underline block text-center"
            >
              Gửi lại email xác thực
            </Link>
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
          className="border rounded w-full p-2 mb-4"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm(f => ({...f, password: e.target.value}))}
          required
        />
        <button 
          className="w-full py-2 rounded bg-indigo-600 text-white disabled:opacity-50" 
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="text-sm mt-3">
          Don't have an account? <Link to="/signup" className="text-indigo-600">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
