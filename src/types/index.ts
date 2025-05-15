export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface Statistics {
  completedTasks: number;
  pendingTasks: number;
  totalTasks: number;
  completionRate: number;
}