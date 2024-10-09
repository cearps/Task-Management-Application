type KanbanBoard = {
  id: number;
  name: string;
  description?: string;
  startDate: string;
  dueDate: string;
  users: UserInfo[];
  tasks: KanbanTask[];
};

type UserInfo = {
  id: number;
  userTag: string;
};

type KanbanTask = {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  urgency: number;
  taskCategory: number;
  users: UserInfo[];
  comments: Comment[];
};

type NewUserData = {
  userTag: string;
  email: string;
  password: string;
};

type User = {
  id: number;
  email: string;
  userTag: string;
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
  logInCount: number;
};

type Comment = {
  id: number;
  comment: string;
  user: {
    userId: number;
    userTag: string;
  };
  timestamp: string;
};

type NewComment = {
  comment: string;
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
  UserInfo,
  NewComment,
};
