import React, { useState } from 'react';

export default function Events() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = [
    { id: 1, title: "School Festival", date: "2021-03-20", time: "09:00 AM", category: "Festival", color: "bg-primary" },
    { id: 2, title: "Math Competition", date: "2021-03-22", time: "10:00 AM", category: "Competition", color: "bg-secondary" },
    { id: 3, title: "Swimming Class", date: "2021-03-25", time: "02:00 PM", category: "Sports", color: "bg-accent" },
    { id: 4, title: "History Museum Visit", date: "2021-03-28", time: "08:00 AM", category: "Excursion", color: "bg-yellow-400" },
  ];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const totalDays = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);
    const days = [];

    // Empty cells for days before start of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-100 bg-gray-50"></div>);
    }

    // Days of the month
    for (let i = 1; i <= totalDays; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayEvents = events.filter(e => e.date === dateStr);

      days.push(
        <div key={i} className="h-24 border border-gray-100 p-2 relative hover:bg-gray-50 transition-colors group">
          <span className={`text-sm font-medium ${dayEvents.length > 0 ? 'text-primary' : 'text-gray-500'}`}>{i}</span>
          <div className="mt-1 space-y-1">
            {dayEvents.map(event => (
              <div key={event.id} className={`text-xs text-white px-1.5 py-0.5 rounded truncate ${event.color}`}>
                {event.title}
              </div>
            ))}
          </div>
          {dayEvents.length === 0 && (
            <button className="absolute bottom-2 right-2 text-primary opacity-0 group-hover:opacity-100 text-xl">+</button>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="p-8 h-full flex flex-col gap-8 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-dark">School Events</h2>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-full bg-primary text-white font-bold shadow-lg hover:bg-indigo-700 transition-colors">
            + Add Event
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-full">
        {/* Calendar Section */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-text-dark">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex gap-2">
              <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} className="p-2 hover:bg-gray-100 rounded-full">◀</button>
              <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} className="p-2 hover:bg-gray-100 rounded-full">▶</button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-gray-400 font-medium py-2">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 flex-1 border-t border-l border-gray-100">
            {renderCalendar()}
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-lg text-text-dark mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {events.map(event => (
                <div key={event.id} className="flex gap-4 items-start border-l-4 border-transparent hover:border-primary pl-2 transition-all">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 ${event.color}`}>
                    {event.category[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark text-sm">{event.title}</h4>
                    <p className="text-xs text-gray-500">{event.time}</p>
                    <p className="text-xs text-gray-400 mt-1">{event.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
