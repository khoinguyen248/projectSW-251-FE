import { useState, useEffect } from "react"; // Thêm dòng này
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext";
import { getNotifications } from "../../hooks/useAuth"; // Bỏ markAllRead vì không dùng ở đây

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { profile } = useProfile();
  
  const [unreadCount, setUnreadCount] = useState(0);

  const path = location.pathname;
  const lastSegment = path === "/" 
    ? "Dashboard" 
    : path.split("/").filter(Boolean).pop();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

useEffect(() => {
    if (user) {
      loadNotifications(); 
      const handleNotificationUpdate = () => {
        loadNotifications();
      };
      window.addEventListener("notificationUpdated", handleNotificationUpdate);
      return () => {
        window.removeEventListener("notificationUpdated", handleNotificationUpdate);
      };
    }
  }, [user]);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      if (data && typeof data.unreadCount !== 'undefined') {
        setUnreadCount(data.unreadCount);
      }
    } catch (e) { 
      console.error("Failed to load notifications:", e); 
    }
  };
  
  const handleBellClick = () => {
      navigate("/notifications");
  };

  return (
    <header className="h-16 bg-white flex items-center justify-between px-4 shadow">
      {/* Title */}
      <h1 className="text-2xl font-bold capitalize">{lastSegment}</h1>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100" onClick={handleBellClick}>
          <span className="text-xl">🔔</span>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
              {unreadCount}
            </span>
          )}
        </button>
        
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-medium text-sm">
              {profile?.fullName || user?.email}
            </span>
            <span className="text-xs text-gray-500 capitalize">
              {user?.role?.toLowerCase()}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;