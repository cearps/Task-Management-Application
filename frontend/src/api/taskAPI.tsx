import axios from "axios";
import { Observable, interval, from, concat, of } from "rxjs";
import { switchMap } from "rxjs/operators";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default class TaskAPI {
  static async getTaskComments(taskId: string) {
    return axios.get(`${baseUrl}/tasks/${taskId}/comments`);
  }

  static async getTaskAssignees(taskId: string) {
    return axios.get(`${baseUrl}/tasks/${taskId}/assignees`);
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
