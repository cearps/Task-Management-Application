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
}
