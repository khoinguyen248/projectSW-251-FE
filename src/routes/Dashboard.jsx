import SidebarRight from "../components/Layout/SidebarRight";
import StatsCard from "../components/UI/StatsCard";
import SchoolPerformanceChart from "../components/Charts/SchoolPerformanceChart";
import SchoolFinanceChart from "../components/Charts/SchoolFinanceChart";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { label: "Students", value: "932", icon: "👨‍🎓", color: "bg-primary" },
    { label: "Teachers", value: "754", icon: "👩‍🏫", color: "bg-secondary" },
    { label: "Events", value: "40", icon: "📅", color: "bg-accent" },
    
  ];

  return (
    <div className="flex gap-8 h-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-8 overflow-y-auto pb-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm h-96 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-text-dark">School Performance</h3>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary"></span>
                  <span className="text-text-dark">This Week</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-accent"></span>
                  <span className="text-text-dark">Last Week</span>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full h-full">
              <SchoolPerformanceChart />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm h-96 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-text-dark">School Finance</h3>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary"></span>
                  <span className="text-text-dark">Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-accent"></span>
                  <span className="text-text-dark">Expense</span>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full h-full">
              <SchoolFinanceChart />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm h-80 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-text-dark">School Calendar</h3>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
              Calendar Placeholder
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm h-80 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-text-dark">Unpaid Student Intuition</h3>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
              List Placeholder
            </div>
          </div>
        </div>

      </div>

      {/* Right Sidebar */}

    </div>
  );
}
