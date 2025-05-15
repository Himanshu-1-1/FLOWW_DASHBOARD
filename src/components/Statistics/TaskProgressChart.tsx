import React from 'react';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Task } from '../../types';
import Card from '../UI/Card';

interface TaskProgressChartProps {
  tasks: Task[];
}

const TaskProgressChart: React.FC<TaskProgressChartProps> = ({ tasks }) => {
  const tasksByDate = tasks.reduce((acc: Record<string, { date: string; completed: number; pending: number }>, task) => {
    const date = format(new Date(task.createdAt), 'MMM dd');
    if (!acc[date]) {
      acc[date] = { date, completed: 0, pending: 0 };
    }
    if (task.completed) {
      acc[date].completed += 1;
    } else {
      acc[date].pending += 1;
    }
    return acc;
  }, {});

  const data = Object.values(tasksByDate);

  return (
    <Card className="h-[300px]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Task Progress Over Time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completed" stackId="a" fill="#10B981" name="Completed" />
          <Bar dataKey="pending" stackId="a" fill="#F59E0B" name="Pending" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TaskProgressChart;