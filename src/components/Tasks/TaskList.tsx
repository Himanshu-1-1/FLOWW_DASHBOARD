import React, { useState } from 'react';
import { useDashboard } from '../../contexts/DashboardContext';
import TaskItem from './TaskItem';
import Card from '../UI/Card';
import { Plus, ClipboardList } from 'lucide-react';

const TaskList: React.FC = () => {
  const { tasks, addTask, loading } = useDashboard();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      await addTask(newTaskTitle.trim());
      setNewTaskTitle('');
      setIsAdding(false);
    }
  };

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Tasks</h2>
        
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center text-sm text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            Add Task
          </button>
        )}
      </div>
      
      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter task title..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-dark-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              autoFocus
            />
            <button
              type="submit"
              disabled={!newTaskTitle.trim() || loading}
              className="px-4 py-2 bg-blue-500 dark:bg-blue-400 text-white dark:text-gray-900 rounded-r-md hover:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-sm text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-y-auto max-h-[calc(100vh-20rem)]">
        {tasks.length === 0 ? (
          <div className="py-12 text-center text-gray-500 dark:text-gray-300">
            <ClipboardList size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
            <p className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-100">No tasks yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">Add a task to get started!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskList;