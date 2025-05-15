import React from 'react';
import { useDashboard } from '../../contexts/DashboardContext';

const getProgressState = (percent: number) => {
  if (percent < 25) {
    return {
      message: "Let's get started!",
      icon: '🔥',
      glow: 'shadow-[0_0_12px_3px_rgba(239,68,68,0.4)] dark:shadow-[0_0_12px_3px_rgba(239,68,68,0.4)]',
      text: 'text-red-600 dark:text-red-400',
      gradient: 'from-red-500 to-red-400',
      subtitle: 'Small steps make big changes.',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    };
  } else if (percent < 75) {
    return {
      message: "Almost there!",
      icon: '🚀',
      glow: 'shadow-[0_0_12px_3px_rgba(251,191,36,0.4)] dark:shadow-[0_0_12px_3px_rgba(251,191,36,0.4)]',
      text: 'text-amber-600 dark:text-amber-400',
      gradient: 'from-amber-500 to-amber-400',
      subtitle: 'Keep pushing forward!',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    };
  } else {
    return {
      message: "You're crushing it!",
      icon: '🏆',
      glow: 'shadow-[0_0_12px_3px_rgba(34,197,94,0.4)] dark:shadow-[0_0_12px_3px_rgba(34,197,94,0.4)]',
      text: 'text-green-600 dark:text-green-400',
      gradient: 'from-green-500 to-green-400',
      subtitle: 'Incredible progress!',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    };
  }
};

const OverallProgress: React.FC = () => {
  const { statistics } = useDashboard();
  const percent = statistics.totalTasks > 0 ? Math.round((statistics.completedTasks / statistics.totalTasks) * 100) : 0;
  const { message, icon, glow, text, gradient, subtitle, bgColor } = getProgressState(percent);

  return (
    <div className="w-[90%] max-w-6xl mx-auto p-6 bg-white dark:bg-dark-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700/30 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${bgColor} transition-colors duration-300`}>
              <span className={`text-2xl ${text}`}>{icon}</span>
            </div>
            <div>
              <h3 className={`text-xl font-semibold ${text} transition-colors duration-300`}>{message}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 transition-colors duration-300">{subtitle}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">{percent}%</span>
        </div>
      </div>

      <div className="w-full">
        <div className="relative h-5 bg-gray-100 dark:bg-dark-700/30 rounded-full overflow-hidden transition-colors duration-300">
          <div
            className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-700 ease-out ${glow}`}
            style={{ 
              width: `${percent}%`,
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OverallProgress;
