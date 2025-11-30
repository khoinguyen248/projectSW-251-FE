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
  setOk("Tạo tài khoản thành công! Vui lòng kiểm tra email để xác thực.");
  
  // Redirect đến resend-verification sau 3 giây
  setTimeout(() => {
    navigate('/resend-verification', { 
      state: { email: form.email },
      replace: true 
    });
  }, 3000);
} catch (e) {
  setErr(e.message || "Signup failed");
} finally {
      setLoading(false);
    }
  };

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //     <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
  //       <h1 className="text-2xl font-bold mb-4">Sign up</h1>
        
  //       {err && (
  //         <div className="mb-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
  //           {err}
  //         </div>
  //       )}
        
  //       {ok && (
  //         <div className="mb-3 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
  //           {ok}
  //         </div>
  //       )}
        
  //       <input
  //         className="border rounded w-full p-2 mb-3"
  //         placeholder="Email"
  //         type="email"
  //         value={form.email}
  //         onChange={(e) => setForm(f => ({...f, email: e.target.value}))}
  //         required
  //       />
        
  //       <input
  //         className="border rounded w-full p-2 mb-3"
  //         placeholder="Password"
  //         type="password"
  //         value={form.password}
  //         onChange={(e) => setForm(f => ({...f, password: e.target.value}))}
  //         required
  //         minLength={6}
  //       />
        
  //       {/* THÊM SELECT CHO ROLE */}
  //       <div className="mb-4">
  //         <label className="block text-sm font-medium text-gray-700 mb-1">
  //           I am a:
  //         </label>
  //         <select
  //           className="border rounded w-full p-2"
  //           value={form.role}
  //           onChange={(e) => setForm(f => ({...f, role: e.target.value}))}
  //           required
  //         >
  //           <option value="STUDENT">Student</option>
  //           <option value="TUTOR">Tutor</option>
  //         </select>
  //       </div>
        
  //       <button 
  //         className="w-full py-2 rounded bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed" 
  //         disabled={loading}
  //       >
  //         {loading ? "Creating Account..." : "Create Account"}
  //       </button>
        
  //       <div className="text-sm mt-3 text-center">
  //         Already have an account?{" "}
  //         <Link to="/login" className="text-indigo-600 hover:underline">
  //           Log in
  //         </Link>
  //       </div>
  //     </form>
  //   </div>
  // );
  return (
  <div className="min-h-screen flex items-center justify-center bg-[#f3f4f8]">
    <div className="relative w-full max-w-6xl px-4 lg:px-0">
      <div className="relative grid gap-10 items-center lg:grid-cols-[2fr,1.2fr]">
        {/* LEFT HERO CARD – giống login */}
        <section className="order-2 lg:order-1">
          <div
            className="rounded-[32px] p-[6px] shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
            style={{
              background:
                "linear-gradient(90deg,#302bff 0%,#f2c94c 50%,#f2994a 100%)",
            }}
          >
            <div className="rounded-[26px] bg-white/5 backdrop-blur-md p-10 border border-white/35">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-8">
                WHERE STUDENTS AND TUTORS
                <br />
                MEET SUCCESS.
              </h1>

              <ul className="space-y-3 text-lg text-white font-semibold">
                <li>• EASY MATCHING</li>
                <li>• RELIABLE SUPPORT</li>
                <li>• GOAL-ORIENTED LEARNING</li>
              </ul>
            </div>
          </div>
        </section>

        {/* RIGHT SIGNUP CARD */}
        <section className="order-1 lg:order-2">
          {/* Logo + brand */}
          <div className="mb-6 flex items-center gap-2 justify-center lg:justify-start">
            <div className="h-8 w-8 rounded-full bg-[#ff7a45] flex items-center justify-center text-white font-bold">
              T
            </div>
            <span className="text-2xl font-semibold text-[#273469]">
              Tutorspace
            </span>
          </div>

          <form
            onSubmit={onSubmit}
            className="bg-white/80 backdrop-blur-md rounded-[28px] px-10 py-8 shadow-[0_25px_70px_rgba(0,0,0,0.18)]"
          >
            <h2 className="text-center text-xl font-semibold tracking-[0.25em] text-[#273469] mb-6">
              SIGN UP
            </h2>

            {/* error */}
            {err && (
              <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg text-sm">
                {err}
              </div>
            )}

            {/* success */}
            {ok && (
              <div className="mb-4 p-3 bg-green-50 border border-green-400 text-green-700 rounded-lg text-sm">
                {ok}
              </div>
            )}

            {/* Email */}
            <div className="mb-4">
              <div className="flex items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
                <input
                  className="flex-1 border-none bg-transparent text-sm placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <div className="flex items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
                <input
                  className="flex-1 border-none bg-transparent text-sm placeholder-gray-400 focus:outline-none"
                  placeholder="Password"
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, password: e.target.value }))
                  }
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* ROLE select – giữ nguyên logic, chỉ đổi style */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                I am a:
              </label>
              <div className="rounded-full bg-white px-5 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
                <select
                  className="w-full border-none bg-transparent text-sm focus:outline-none cursor-pointer"
                  value={form.role}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, role: e.target.value }))
                  }
                  required
                >
                  <option value="STUDENT">Student</option>
                  <option value="TUTOR">Tutor</option>
                </select>
              </div>
            </div>

            {/* BUTTON */}
            <button
              className="w-full py-2.5 rounded-full bg-[#ff7a45] text-white text-sm font-semibold hover:bg-[#ff6424] transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* link to login */}
            <div className="text-xs sm:text-sm mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#273469] font-medium hover:underline"
              >
                Log in
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
);

}