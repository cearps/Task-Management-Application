type Kanban = {
  id: number;
  name: string;
  description: string;
  ownerId: number;
  startDate: string;
  dueDate: string;
};

type Task = {
  id: number;
  boardId: number;
  name: string;
  description: string;
  dueDate: string;
  urgency: number;
  taskCategoryId: number;
};

type User = {
  id: number;
  username: string;
};

type Comment = {
  id: number;
  taskId: number;
  userId: number;
  content: string;
  createdAt: string;
};

export type { Kanban, Task, User, Comment };
