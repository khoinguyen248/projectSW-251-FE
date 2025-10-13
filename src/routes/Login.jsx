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

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setErr("");
    try {
      await login(form); // gọi tới AuthContext (gửi withCredentials, nhận accessToken in-memory)
      navigate(from?.pathname || "/", { replace: true });
    } catch (e) {
      setErr(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Log in</h1>
        {err && <div className="mb-3 text-red-600 text-sm">{err}</div>}
        <input
          className="border rounded w-full p-2 mb-3"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e)=>setForm(f=>({...f, email:e.target.value}))}
          required
        />
        <input
          className="border rounded w-full p-2 mb-4"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e)=>setForm(f=>({...f, password:e.target.value}))}
          required
        />
        <button className="w-full py-2 rounded bg-indigo-600 text-white" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="text-sm mt-3">
          Don’t have an account? <Link to="/signup" className="text-indigo-600">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
