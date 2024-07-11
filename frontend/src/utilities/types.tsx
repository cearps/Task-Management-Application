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

type NewUserData = {
  username: string;
  email: string;
  password: string;
};

type Comment = {
  id: number;
  taskId: number;
  userId: number;
  content: string;
  createdAt: string;
};

type ButtonType = "button" | "submit" | "reset";

export type { Kanban, Task, User, Comment, ButtonType, NewUserData };
