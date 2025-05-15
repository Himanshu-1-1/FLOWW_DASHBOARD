import { User, Task } from '../types';
import { mockUser, mockTasks } from '../data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Get user profile
  getUser: async (): Promise<User> => {
    await delay(800);
    return mockUser;
  },
  
  // Update user profile
  updateUser: async (userData: Partial<User>): Promise<User> => {
    await delay(1000);
    const updatedUser = { ...mockUser, ...userData };
    return updatedUser;
  },
  
  // Get all tasks
  getTasks: async (): Promise<Task[]> => {
    await delay(600);
    return [...mockTasks];
  },
  
  // Toggle task completion
  toggleTaskCompletion: async (taskId: string): Promise<Task> => {
    await delay(400);
    const task = mockTasks.find(t => t.id === taskId);
    
    if (!task) {
      throw new Error('Task not found');
    }
    
    task.completed = !task.completed;
    return { ...task };
  },
  
  // Add new task
  addTask: async (title: string): Promise<Task> => {
    await delay(800);
    const newTask: Task = {
      id: `${mockTasks.length + 1}`,
      title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    mockTasks.push(newTask);
    return newTask;
  },
  
  // Delete task
  deleteTask: async (taskId: string): Promise<void> => {
    await delay(400);
    const taskIndex = mockTasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    mockTasks.splice(taskIndex, 1);
  }
};