import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', income: 40, expense: 24 },
    { name: 'Tue', income: 30, expense: 13 },
    { name: 'Wed', income: 20, expense: 98 },
    { name: 'Thu', income: 27, expense: 39 },
    { name: 'Fri', income: 18, expense: 48 },
    { name: 'Sat', income: 23, expense: 38 },
    { name: 'Sun', income: 34, expense: 43 },
];

const SchoolFinanceChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                barSize={15}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A098AE', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A098AE', fontSize: 12 }} />
                <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="income" fill="#FB7D5B" radius={[10, 10, 10, 10]} />
                <Bar dataKey="expense" fill="#FCC43E" radius={[10, 10, 10, 10]} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SchoolFinanceChart;
