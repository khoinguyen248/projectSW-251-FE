import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', thisWeek: 20, lastWeek: 30 },
    { name: 'Feb', thisWeek: 40, lastWeek: 50 },
    { name: 'Mar', thisWeek: 30, lastWeek: 40 },
    { name: 'Apr', thisWeek: 70, lastWeek: 60 },
    { name: 'May', thisWeek: 40, lastWeek: 50 },
    { name: 'Jun', thisWeek: 50, lastWeek: 60 },
    { name: 'Jul', thisWeek: 60, lastWeek: 70 },
    { name: 'Aug', thisWeek: 50, lastWeek: 40 },
    { name: 'Sep', thisWeek: 40, lastWeek: 30 },
    { name: 'Oct', thisWeek: 60, lastWeek: 50 },
    { name: 'Nov', thisWeek: 80, lastWeek: 70 },
    { name: 'Dec', thisWeek: 70, lastWeek: 60 },
];

const SchoolPerformanceChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A098AE', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A098AE', fontSize: 12 }} />
                <Tooltip
                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="thisWeek" stroke="#FB7D5B" strokeWidth={4} dot={false} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="lastWeek" stroke="#FCC43E" strokeWidth={4} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SchoolPerformanceChart;
