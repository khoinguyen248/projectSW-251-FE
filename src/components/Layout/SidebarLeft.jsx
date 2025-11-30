import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  { label: "Dashboard", icon: "🏠", nav: "/", roles: ["STUDENT", "TUTOR"] },
  { label: "Students", icon: "👨‍🎓", nav: "/students", roles: ["TUTOR"] },
  { label: "Teachers", icon: "👩‍🏫", nav: "/teachers", roles: ["STUDENT", "TUTOR"] },
  { label: "Smart Tutors", icon: "🧠", nav: "/smart-tutors", roles: ["STUDENT"] },
  { label: "Student DB", icon: "🎓", nav: "/student-dashboard", roles: ["STUDENT"] },
  { label: "Schedule", icon: "📅", nav: "/session", roles: ["STUDENT"] },
  { label: "Pending", icon: "⏳", nav: "/pending", roles: ["TUTOR"] },
  { label: "Register", icon: "📝", nav: "/registration", roles: ["STUDENT"] },
  { label: "Event", icon: "🎉", nav: "/events", roles: ["STUDENT", "TUTOR"] },
  { label: "Finance", icon: "💰", nav: "/finance", roles: ["TUTOR"] },
  { label: "User", icon: "👤", nav: "/profile-setup", roles: ["STUDENT", "TUTOR"] },
  { label: "Chat", icon: "💬", nav: "/chat", roles: ["STUDENT", "TUTOR"] },
];

export default function SidebarLeft() {
  const { user } = useAuth();
  const userRole = user?.role || "STUDENT"; // Default to STUDENT if no role

  const filteredMenu = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="w-64 bg-primary text-white flex flex-col h-full">
      <div className="h-20 flex items-center px-8 text-2xl font-bold gap-3">
        <span className="bg-orange-500 rounded-lg p-1 text-white text-sm">A</span>
        Akademi
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        {filteredMenu.map((item) => (
          <NavLink
            key={item.label}
            to={item.nav}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-6 rounded-l-full transition-colors
               ${isActive ? "bg-bg-gray text-primary" : "text-gray-300 hover:text-white"}`
            }
            end={item.nav === "/"}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="px-8 py-6 text-xs text-gray-400">
        <p>Akademi - School Admission Dashboard</p>
        <p className="mt-1">Made with ❤️ by Peterdraw</p>
      </div>
    </div>
  );
}
