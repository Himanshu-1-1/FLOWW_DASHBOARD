import React from 'react';
import { useDashboard } from '../../contexts/DashboardContext';
import Header from './Header';
import ProfileCard from '../Profile/ProfileCard';
import TaskList from '../Tasks/TaskList';
import StatCard from '../Statistics/StatCard';
import Spinner from '../UI/Spinner';
import TaskCompletionChart from '../Statistics/TaskCompletionChart';
import TaskProgressChart from '../Statistics/TaskProgressChart';
import OverallProgress from '../Statistics/OverallProgress';
import { CheckCircle, Clock, ListChecks, Percent } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, loading, statistics, tasks } = useDashboard();
  
  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-dark-900">
        <Spinner size="lg" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user && (
          <div className="flex flex-col gap-8">
            {/* Task Statistics Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 transition-colors">Task Statistics</h2>
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
            </section>

            {/* Profile and Task Section */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div>
                  <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 transition-colors">Profile</h2>
                  <ProfileCard user={user} />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 transition-colors">Tasks</h2>
                  <TaskList />
                </div>
              </div>
            </section>

            {/* Overall Progress Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 transition-colors">Overall Progress</h2>
              <OverallProgress />
            </section>

            {/* Task Completion Status & Progress Over Time */}
            <section>
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 transition-colors">Task Completion & Trends</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TaskCompletionChart completed={statistics.completedTasks} pending={statistics.pendingTasks} />
                <TaskProgressChart tasks={tasks} />
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;