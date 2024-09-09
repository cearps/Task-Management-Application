import { KanbanBoard } from "./types";

class BoardApiError extends Error {
  constructor(message: string, public board: KanbanBoard, public error: any) {
    super(message);
    this.name = "BoardApiError";
  }
}

export { BoardApiError };
