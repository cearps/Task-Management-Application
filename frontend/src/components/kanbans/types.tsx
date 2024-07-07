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

export type { Kanban, Task };
