import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const { user } = useDashboard();
  
  return (
    <header className="bg-white dark:bg-dark-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <LayoutDashboard size={24} className="text-blue-500 dark:text-blue-400 mr-2" />
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user && (
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-3 hidden sm:block">
                  {user.name}
                </span>
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img 
                    src={user.profilePicture} 
                    alt={`${user.name}'s profile`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;