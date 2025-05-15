import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Task, Statistics } from '../types';
import { api } from '../services/api';

interface DashboardContextType {
  user: User | null;
  tasks: Task[];
  statistics: Statistics;
  loading: boolean;
  updateUser: (userData: Partial<User>) => Promise<void>;
  toggleTaskCompletion: (taskId: string) => Promise<void>;
  addTask: (title: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const TASKS_STORAGE_KEY = 'dashboard_tasks';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Calculate statistics based on tasks
  const statistics: Statistics = {
    completedTasks: tasks.filter(task => task.completed).length,
    pendingTasks: tasks.filter(task => !task.completed).length,
    totalTasks: tasks.length,
    completionRate: tasks.length > 0 
      ? Math.round((tasks.filter(task => task.completed).length / tasks.length) * 100) 
      : 0
  };

  // Fetch initial user data only
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userData = await api.getUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Toggle task completion
  const toggleTaskCompletion = async (taskId: string) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === taskId);
      if (!taskToUpdate) return;

      const updatedTask = {
        ...taskToUpdate,
        completed: !taskToUpdate.completed
      };

      setTasks(tasks.map(task => 
        task.id === taskId ? updatedTask : task
      ));

      // Update localStorage
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(
        tasks.map(task => task.id === taskId ? updatedTask : task)
      ));

    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  // Update user profile
  const updateUser = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      const updatedUser = await api.updateUser(userData);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add new task
  const addTask = async (title: string) => {
    try {
      setLoading(true);
      const newTask: Task = {
        id: Date.now().toString(), // Generate unique ID
        title,
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      // Remove task from state
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      
      // Update localStorage
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <DashboardContext.Provider value={{
      user,
      tasks,
      statistics,
      loading,
      updateUser,
      toggleTaskCompletion,
      addTask,
      deleteTask,
      isEditing,
      setIsEditing
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  
  return context;
};