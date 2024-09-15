import { KanbanBoard, KanbanTask } from "./types";

class BoardApiError extends Error {
  constructor(message: string, public board: KanbanBoard, public error: any) {
    super(message);
    this.name = "BoardApiError";
  }
}

class TaskApiError extends Error {
  constructor(message: string, public task: KanbanTask, public error: any) {
    super(message);
    this.name = "TaskApiError";
  }
}

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export { ApiError, BoardApiError, TaskApiError };
