import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { profile } = useProfile();

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

  return (
    <header className="h-16 bg-white flex items-center justify-between px-4 shadow">
      {/* Title */}
      <h1 className="text-2xl font-bold capitalize">{lastSegment}</h1>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <button
          className="relative"
          onClick={() => navigate("/notifications")}
        >
          🔔
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
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
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;