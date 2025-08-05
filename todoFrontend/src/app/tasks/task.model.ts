export type TaskStatus = 'OPEN' | 'COMPLETED';

export interface Task {
  id: string;
  title: string;
  summary: string;
  dueDate: string;
  status?: TaskStatus;
  userId: string;
}

export interface NewTaskData {
  title: string;
  summary: string;
  dueDate: string;
  completed?: boolean;
  userId?: string;
}