import axios from "axios";
import { Observable, interval, from } from "rxjs";
import { switchMap } from "rxjs/operators";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

console.log(baseUrl);

export default class KanbanAPI {
  static async getKanbanBoards() {
    return axios.get(`${baseUrl}/boards`);
  }

  static async getKanbanBoard(id: string) {
    return axios.get(`${baseUrl}/boards/${id}`);
  }

  static getKanbanBoardsObservable(): Observable<any> {
    return interval(1000).pipe(
      switchMap(() => {
        return from(KanbanAPI.getKanbanBoards());
      })
    );
  }

  static getKanbanBoardObservable(id: string): Observable<any> {
    return interval(1000).pipe(
      switchMap(() => {
        return from(KanbanAPI.getKanbanBoard(id));
      })
    );
  }
}
