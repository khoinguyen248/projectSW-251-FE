import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: "🏠", nav: "/" },
  { label: "Students",  icon: "👨‍🎓", nav: "/students" },
  { label: "Teachers",  icon: "👩‍🏫", nav: "/teachers" },
  { label: "Enrollsubject",     icon: "📅",   nav: "/registration" },
  { label: "Session",   icon: "💰",   nav: "/session" },
  { label: "Food",      icon: "🍔",   nav: "/dashboard" },
  { label: "User",      icon: "👤",   nav: "/profile-setup" },
  { label: "Chat",      icon: "💬",   nav: "/dashboard" },
  { label: "Latest Activity", icon: "🕒", nav: "/dashboard" },
];

export default function SidebarLeft() {
  return (
    <div className="w-64 bg-indigo-700 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center text-xl font-bold">Akademi</div>
      <nav className="flex-1 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.nav}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md cursor-pointer
               hover:bg-indigo-600 ${isActive ? "bg-indigo-600" : ""}`
            }
            end={item.nav === "/"} // để "/" không active khi ở "/students"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
