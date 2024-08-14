import axios from "axios";
import { Observable, interval, concat, of, from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { API_URL } from "./apiConfig";

class TaskAPI {
  // Fetch task comments by task ID
  static async getTaskComments(taskId: string) {
    return axios.get(`${API_URL}/tasks/${taskId}/comments`);
  }

  // Fetch task assignees by task ID
  static async getTaskAssignees(taskId: string) {
    return axios.get(`${API_URL}/tasks/${taskId}/assignees`);
  }

  // Observable for task comments
  static getTaskCommentsObservable(taskId: string): Observable<any> {
    return concat(of(0), interval(1000)).pipe(
      switchMap(() => {
        return from(TaskAPI.getTaskComments(taskId));
      })
    );
  }

  // Observable for task assignees
  static getTaskAssigneesObservable(taskId: string): Observable<any> {
    return concat(of(0), interval(1000)).pipe(
      switchMap(() => {
        return from(TaskAPI.getTaskAssignees(taskId));
      })
    );
  }

  // Method to create a new task
  static async createTask(newTask: any) {
    return axios.post(`${API_URL}/tasks`, newTask);
  }
}

export default TaskAPI;
