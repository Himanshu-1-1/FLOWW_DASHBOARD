import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '../UI/Card';

interface TaskCompletionChartProps {
  completed: number;
  pending: number;
}

const COLORS = ['#34d399', '#fbbf24']; // Tailwind green-400, amber-400

const getMotivation = (percent: number) => {
  if (percent === 100) return { emoji: '🎉', quote: "All done! Amazing work!" };
  if (percent >= 80) return { emoji: '🚀', quote: "Almost there! Keep going!" };
  if (percent >= 40) return { emoji: '💪', quote: "Great progress!" };
  return { emoji: '🌱', quote: "Every task counts!" };
};

const TaskCompletionChart: React.FC<TaskCompletionChartProps> = ({ completed, pending }) => {
  const total = completed + pending;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const { emoji, quote } = getMotivation(percent);
  const data = [
    { name: 'Completed', value: completed },
    { name: 'Pending', value: pending }
  ];

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-md hover:shadow-xl transition-all space-y-4 group cursor-pointer">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
        Task Completion <span className="text-2xl">{emoji}</span>
      </h2>
      <div className="relative flex items-center justify-center">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={3}
              dataKey="value"
              isAnimationActive={true}
              animationDuration={900}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value} tasks`,
                name
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Radial mini progress indicator */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-green-400 drop-shadow-sm transition-all">{percent}%</span>
          <span className="text-xs text-gray-500 font-medium mt-1">Complete</span>
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-4">
        <div className="font-medium flex items-center gap-1">✅ <span className="font-bold text-green-400">{completed}</span> Completed</div>
        <div className="font-medium flex items-center gap-1">🕓 <span className="font-bold text-amber-400">{pending}</span> Pending</div>
        <div className="font-medium flex items-center gap-1">📈 <span className="font-bold">{percent}%</span></div>
      </div>
      <div className="mt-2 text-center text-base text-gray-700 dark:text-gray-200 font-medium italic transition-colors">
        {quote}
      </div>
    </Card>
  );
};

export default TaskCompletionChart;