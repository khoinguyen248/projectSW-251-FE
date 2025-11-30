import React from 'react';
import StatsCard from "../components/UI/StatsCard";
import SchoolPerformanceChart from "../components/Charts/SchoolPerformanceChart"; // Reusing for Balance Analytics for now
import { Pagination } from "antd";

export default function Finance() {
  const stats = [
    { label: "Total Students", value: "932", icon: "👨‍🎓", color: "bg-primary" },
    { label: "Total Teachers", value: "754", icon: "👩‍🏫", color: "bg-secondary" },
    { label: "School Balance", value: "$123,456", icon: "💰", color: "bg-accent" },
  ];

  const unpaidStudents = [
    { name: "Samantha William", id: "123456789", class: "VII A", amount: "$50,036", avatar: "https://i.pravatar.cc/150?img=1" },
    { name: "Tony Soap", id: "123456789", class: "VII A", amount: "$50,036", avatar: "https://i.pravatar.cc/150?img=2" },
    { name: "Jordan Nico", id: "123456789", class: "VII A", amount: "$50,036", avatar: "https://i.pravatar.cc/150?img=3" },
    { name: "Karen Hope", id: "123456789", class: "VII A", amount: "$50,036", avatar: "https://i.pravatar.cc/150?img=4" },
    { name: "Nadila Adja", id: "123456789", class: "VII A", amount: "$50,036", avatar: "https://i.pravatar.cc/150?img=5" },
  ];

  const expenses = [
    { id: "#123456789", date: "2 March 2021, 13:45 PM", amount: "$50,036", status: "Complete", statusColor: "text-green-500" },
    { id: "#123456789", date: "2 March 2021, 13:45 PM", amount: "$50,036", status: "Pending", statusColor: "text-yellow-500" },
    { id: "#123456789", date: "2 March 2021, 13:45 PM", amount: "$50,036", status: "Canceled", statusColor: "text-red-500" },
    { id: "#123456789", date: "2 March 2021, 13:45 PM", amount: "$50,036", status: "Complete", statusColor: "text-green-500" },
    { id: "#123456789", date: "2 March 2021, 13:45 PM", amount: "$50,036", status: "Complete", statusColor: "text-green-500" },
  ];

  return (
    <div className="p-8 h-full flex flex-col gap-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-dark">Finance</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Balance Analytics */}
      <div className="bg-white p-6 rounded-2xl shadow-sm h-96 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-text-dark">Balance Analytics</h3>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-secondary"></span>
              <span className="text-text-dark">Expense</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent"></span>
              <span className="text-text-dark">Income</span>
            </div>
            <select className="border rounded-full px-3 py-1 text-xs">
              <option>Month</option>
              <option>Year</option>
            </select>
          </div>
        </div>
        <div className="flex-1 w-full h-full">
          <SchoolPerformanceChart />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unpaid Student Intuition */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-text-dark">Unpaid Student Intuition</h3>
            <button className="text-primary text-2xl">•••</button>
          </div>
          <div className="space-y-4">
            {unpaidStudents.map((student, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-bold text-text-dark text-sm">{student.name}</p>
                    <p className="text-xs text-primary">ID {student.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-xs">👤</span>
                    <div>
                      <p className="text-xs text-gray-500">Class</p>
                      <p className="font-bold text-text-dark text-sm">{student.class}</p>
                    </div>
                  </div>
                  <p className="font-bold text-text-dark">{student.amount}</p>
                  <button className="text-gray-400">•••</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Pagination simple defaultCurrent={1} total={50} />
          </div>
        </div>

        {/* School Expense */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-text-dark">School Expense</h3>
            <button className="text-primary text-2xl">•••</button>
          </div>
          <div className="space-y-4">
            {expenses.map((expense, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                    📈
                  </div>
                  <div>
                    <p className="font-bold text-text-dark text-sm">{expense.id}</p>
                    <p className="text-xs text-gray-500">{expense.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <p className="font-bold text-text-dark">{expense.amount}</p>
                  <span className={`text-xs font-bold ${expense.statusColor}`}>{expense.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Pagination simple defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </div>
  );
}