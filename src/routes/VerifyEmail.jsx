import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import API from "../hooks/useAuth";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      const userId = searchParams.get('userId');

      if (!token || !userId) {
        setStatus("invalid");
        return;
      }

      try {
        console.log("🔄 Verifying email with:", { token, userId });
        await API.post("/auth/verify-email", { token, userId });
        setStatus("success");
        
        // Tự động chuyển hướng sau 3 giây
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        console.error("❌ Verification failed:", error);
        setStatus("error");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  if (status === "verifying") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Đang xác thực email...
          </h2>
          <p className="text-gray-600">
            Vui lòng chờ trong giây lát.
          </p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-green-500 text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Xác thực thành công!
          </h1>
          <p className="text-gray-600 mb-6">
            Email của bạn đã được xác thực. 
            Bạn sẽ được chuyển đến trang đăng nhập trong 3 giây...
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate("/login")}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Đăng nhập ngay
            </button>
            <Link 
              to="/"
              className="inline-block w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Link không hợp lệ
          </h1>
          <p className="text-gray-600 mb-6">
            Link xác thực thiếu thông tin cần thiết.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate("/resend-verification")}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Gửi lại email xác thực
            </button>
            <Link 
              to="/login"
              className="inline-block w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Đến trang đăng nhập
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <div className="text-red-500 text-6xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Xác thực thất bại
        </h1>
        <p className="text-gray-600 mb-6">
          Link xác thực không hợp lệ hoặc đã hết hạn.
        </p>
        <div className="space-y-3">
          <button 
            onClick={() => navigate("/resend-verification")}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Gửi lại email xác thực
          </button>
          <Link 
            to="/signup"
            className="inline-block w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Đăng ký tài khoản mới
          </Link>
          <Link 
            to="/login"
            className="inline-block w-full px-6 py-3 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Đến trang đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}