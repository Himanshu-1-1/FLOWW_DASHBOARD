import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '../UI/Card';

interface TaskCompletionChartProps {
  completed: number;
  pending: number;
}

const COLORS = ['#10B981', '#F59E0B'];

const TaskCompletionChart: React.FC<TaskCompletionChartProps> = ({ completed, pending }) => {
  const data = [
    { name: 'Completed', value: completed },
    { name: 'Pending', value: pending }
  ];

  return (
    <Card className="h-[300px]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Task Completion Status</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
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
    </Card>
  );
};

export default TaskCompletionChart;