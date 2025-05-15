import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div
      className={
        `group p-6 rounded-2xl shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-md 
        hover:shadow-xl hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-500 hover:text-white 
        transition-all duration-300 relative overflow-hidden border border-transparent hover:border-indigo-400 dark:hover:border-teal-400`
      }
    >
      <div className="absolute inset-0 pointer-events-none rounded-2xl group-hover:ring-4 group-hover:ring-indigo-200 dark:group-hover:ring-teal-400 transition-all duration-300" />
      <div className="flex items-center gap-4">
        <div className={`text-3xl mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:drop-shadow-lg ${color}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#111827] dark:text-gray-100 group-hover:text-white transition-colors duration-300">{title}</h3>
          <p className="text-2xl font-bold text-[#111827] dark:text-gray-100 group-hover:text-white transition-colors duration-300">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;