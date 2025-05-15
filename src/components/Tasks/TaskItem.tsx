import React, { useState } from 'react';
import { Task } from '../../types';
import { useDashboard } from '../../contexts/DashboardContext';
import { Check, Clock, Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask } = useDashboard();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    // Wait for animation to complete before actual deletion
    setTimeout(async () => {
      await deleteTask(task.id);
    }, 300); // Match this with CSS transition duration
  };

  return (
    <div 
      className={`
        flex items-center p-3 group rounded-lg transition-all duration-300
        ${task.completed 
          ? 'bg-green-50 border-l-4 border-green-500 shadow-sm hover:shadow-md' 
          : 'border-b border-gray-100 bg-white dark:bg-gray-800'}
        ${isDeleting ? 'opacity-0 transform -translate-x-full h-0 p-0 m-0' : 'opacity-100 transform translate-x-0'}
      `}
      style={{ 
        transition: 'all 0.3s ease-in-out',
        height: isDeleting ? '0' : 'auto',
        overflow: 'hidden'
      }}
    >
      <button
        onClick={() => toggleTaskCompletion(task.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border transform transition-all duration-300 
          ${task.completed 
            ? 'bg-green-500 border-green-500 text-white scale-110' 
            : 'border-gray-300 hover:border-blue-500 hover:scale-105'
          } flex items-center justify-center`}
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        <Check 
          size={14} 
          className={`transform transition-all duration-300 
            ${task.completed ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
        />
      </button>
      <div className="flex-1 ml-3 flex items-center gap-2">
        <p
          className={`text-sm font-medium transition-colors duration-200 cursor-pointer \
            ${task.completed 
              ? 'line-through text-gray-700' 
              : 'text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400'}
          `}
        >
          {task.title}
        </p>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 ml-3">
        <Clock size={12} className="inline mr-1" />
        {formatDate(task.createdAt)}
      </span>
      <div className="flex items-center ml-4">
        {!showConfirmation ? (
          <button
            onClick={() => setShowConfirmation(true)}
            className={`text-red-500 dark:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200 
              hover:text-red-700 dark:hover:text-red-300 hover:scale-110 transform
              ${task.completed ? 'hover:rotate-12' : 'hover:-rotate-12'}`}
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        ) : (
          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 p-1 animate-fadeIn">
            <button
              onClick={handleDelete}
              className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 px-2 py-1 text-sm hover:bg-red-50 dark:hover:bg-gray-700 rounded transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => setShowConfirmation(false)}
              className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 px-2 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;