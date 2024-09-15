import axios, { AxiosResponse } from "axios";
import { Observable, interval, from, concat, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { API_URL } from "./apiConfig";
import { TaskApiError } from "../utilities/errors";
import { KanbanTask } from "../utilities/types";

export default class TaskAPI {
  // Get task comments by taskId
  static async getTaskComments(taskId: string) {
    return axios.get(`${API_URL}/tasks/${taskId}/comments`);
  }

  // Get task assignees by taskId
  static async getTaskAssignees(taskId: string) {
    return axios.get(`${API_URL}/tasks/${taskId}/assignees`);
  }

  // Observable for task comments with periodic updates
  static getTaskCommentsObservable(taskId: string): Observable<KanbanTask> {
    return concat(of(0), interval(1000)).pipe(
      switchMap(() => {
        return from(TaskAPI.getTaskComments(taskId));
      })
    );
  }

  static async createTask(boardId: string) {
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
    boardId: string,
    taskId: ,
    taskData: KanbanTask
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

  // Observable for task assignees with periodic updates
  static getTaskAssigneesObservable(
    taskId: string,
    taskData: KanbanTask
  ): Observable<AxiosResponse<KanbanTask>> {
    return concat(of(), interval(1000)).pipe(
      switchMap(() => {
        return from(TaskAPI.updateTask(taskId, taskData));
      })
    );
  }

  static createTaskObservable(
    boardId: string,
    taskData: KanbanTask
  ): Observable<AxiosResponse<KanbanTask>> {
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
}
