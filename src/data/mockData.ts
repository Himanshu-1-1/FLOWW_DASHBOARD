import { User, Task } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Himanshu Pratap',
  email: 'himanshu.pratap@example.com',
  profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
};

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project dashboard',
    completed: false,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
  },
  {
    id: '2',
    title: 'Review quarterly metrics',
    completed: true,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString() // 3 days ago
  },
  {
    id: '3',
    title: 'Update documentation',
    completed: false,
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: '4',
    title: 'Prepare presentation for stakeholders',
    completed: false,
    createdAt: new Date().toISOString() // Today
  },
  {
    id: '5',
    title: 'Schedule team meeting',
    completed: true,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString() // 4 days ago
  },
  {
    id: '6',
    title: 'Research new technologies',
    completed: false,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
  }
];