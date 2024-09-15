import axios from "axios";
import { Observable, from } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { API_URL } from "./apiConfig";
import { CommentApiError, TaskApiError } from "../utilities/errors";
import { Comment, KanbanTask, NewComment } from "../utilities/types";

export default class TaskAPI {
  static async createTask(boardId: number) {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/kanbans/${boardId}/tasks`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data as KanbanTask;
  }
  static async updateTask(
    boardId: number,
    taskId: number,
    taskData: Partial<KanbanTask>
  ) {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/kanbans/${boardId}/tasks/${taskId}`,
      taskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data as KanbanTask;
  }

  static createTaskObservable(
    boardId: number,
    taskData: Partial<KanbanTask>
  ): Observable<KanbanTask> {
    return from(TaskAPI.createTask(boardId)).pipe(
      switchMap((task) => {
        return from(TaskAPI.updateTask(boardId, task.id, taskData)).pipe(
          catchError((error) => {
            throw new TaskApiError(
              `Error creating task with boardId ${boardId}`,
              task,
              error
            );
          })
        );
      })
    );
  }

  static updateTaskObservable(
    boardId: number,
    taskData: Partial<KanbanTask>
  ): Observable<KanbanTask> {
    if (!taskData.id) {
      throw new TaskApiError("Task id is required", taskData, null);
    }
    return from(TaskAPI.updateTask(boardId, taskData.id, taskData)).pipe(
      catchError((error) => {
        throw new TaskApiError(
          `Error updating task with boardId ${boardId} and taskId ${taskData.id}`,
          taskData,
          error
        );
      })
    );
  }

  static async addComment(
    kanbanId: number,
    taskId: number,
    comment: NewComment
  ) {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/kanbans/${kanbanId}/tasks/${taskId}/comment`,
      comment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data as Comment;
  }

  static addCommentObservable(
    kanbanId: number,
    taskId: number,
    comment: NewComment
  ): Observable<Comment> {
    return from(TaskAPI.addComment(kanbanId, taskId, comment)).pipe(
      catchError((error) => {
        throw new CommentApiError(
          error.response.data.description,
          comment,
          error
        );
      })
    );
  }
}
