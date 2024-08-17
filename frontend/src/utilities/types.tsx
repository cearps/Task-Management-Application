type KanbanBoard = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  dueDate: string;
  userIds: number[];
  tasks: KanbanTask[];
};

type KanbanTask = {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  urgency: number;
  taskCategory: number;
};

type NewUserData = {
  userTag: string;
  email: string;
  password: string;
};

type User = {
  // TODO
};

type SignUpResponse = {
  id: number;
  email: string;
  password?: string;
  fullName: string;
  enabled: boolean;
  username: string;
  authorities: { authority: string }[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
};

type LoginResponse = {
  token: string;
  expiresIn: number;
};

type Comment = {
  id: number;
  taskId: number;
  userId: number;
  content: string;
  createdAt: string;
};

type ButtonType = "button" | "submit" | "reset";

export type {
  KanbanBoard,
  KanbanTask,
  User,
  Comment,
  ButtonType,
  NewUserData,
  LoginResponse,
  SignUpResponse,
};
