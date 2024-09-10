import axios from "axios";
import { Observable, interval, from, concat, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { API_URL } from "./apiConfig";

export default class TaskAPI {

  static async getTaskComments(taskId: string) {
    return axios.get(`${API_URL}/tasks/${taskId}/comments`);
  }

  static async getTaskAssignees(taskId: string) {
    return axios.get(`${API_URL}/tasks/${taskId}/assignees`);
  }

  static getTaskCommentsObservable(taskId: string): Observable<any> {
    return concat(of(0), interval(1000)).pipe(
      switchMap(() => {
        return from(TaskAPI.getTaskComments(taskId));
      })
    );
  }

  static getTaskAssigneesObservable(taskId: string): Observable<any> {
    return concat(of(), interval(1000)).pipe(
      switchMap(() => {
        return from(TaskAPI.getTaskAssignees(taskId));
      })
    );
  }

  // ADDITION: New method to create a task on a specific board
  static async createTask(boardId: string, taskData: any) {
    const token = localStorage.getItem("token"); // Ensure token is retrieved from local storage
    const response = await axios.post(`${API_URL}/kanbans/${boardId}/tasks`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the authorization token
        "Content-Type": "application/json", // Ensure proper content type
      },
    });
    return response.data; // Return the newly created task data
  }
}