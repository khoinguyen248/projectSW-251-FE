import React from 'react';

const StatsCard = ({ icon, label, value, color }) => {
    return (
        <div className="bg-white p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-gray-500 text-sm mb-1">{label}</p>
                <h3 className="text-3xl font-bold text-text-dark">{value}</h3>
            </div>
        </div>
    );
};

export default StatsCard;
