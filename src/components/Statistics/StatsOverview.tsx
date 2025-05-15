import React from 'react';
import { useDashboard } from '../../contexts/DashboardContext';
import StatCard from './StatCard';
import TaskCompletionChart from './TaskCompletionChart';
import TaskProgressChart from './TaskProgressChart';
import CompletionProgress from './CompletionProgress';
import { CheckCircle, Clock, ListChecks, Percent } from 'lucide-react';

const StatsOverview: React.FC = () => {
  const { statistics, tasks } = useDashboard();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          value={statistics.totalTasks}
          icon={<ListChecks size={20} className="text-white" />}
          color="bg-blue-500"
        />
        
        <StatCard
          title="Completed"
          value={statistics.completedTasks}
          icon={<CheckCircle size={20} className="text-white" />}
          color="bg-green-500"
        />
        
        <StatCard
          title="Pending"
          value={statistics.pendingTasks}
          icon={<Clock size={20} className="text-white" />}
          color="bg-amber-500"
        />
        
        <StatCard
          title="Completion Rate"
          value={`${statistics.completionRate}%`}
          icon={<Percent size={20} className="text-white" />}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskCompletionChart
          completed={statistics.completedTasks}
          pending={statistics.pendingTasks}
        />
        <TaskProgressChart tasks={tasks} />
      </div>

      <CompletionProgress percentage={statistics.completionRate} />
    </div>
  );
};

export default StatsOverview;