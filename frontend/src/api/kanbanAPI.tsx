import axios from "axios";
import { Observable, interval, from } from "rxjs";
import { switchMap } from "rxjs/operators";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

console.log(baseUrl);

export default class KanbanAPI {
  static async getKanbanBoards() {
    return axios.get(`${baseUrl}/boards`);
  }

  static getKanbanBoardObservable(): Observable<any> {
    return interval(1000).pipe(
      switchMap(() => {
        return from(KanbanAPI.getKanbanBoards());
      })
    );
  }
}
