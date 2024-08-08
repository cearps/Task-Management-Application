import axios from "axios";
import { Observable, interval, from, concat, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { API_URL } from "./apiConfig";

export default class KanbanAPI {
  static async getKanbanBoards() {
    return axios.get(`${API_URL}/boards`);
  }

  static async getKanbanBoard(id: string) {
    return axios.get(`${API_URL}/boards/${id}`);
  }

  static async getKanbanBoardTasks(boardId: string, categoryId: string) {
    return axios.get(`${API_URL}/boards/${boardId}/tasks/${categoryId}`);
  }

  static getKanbanBoardsObservable(): Observable<any> {
    return concat(of(0), interval(1000)).pipe(
      switchMap(() => {
        return from(KanbanAPI.getKanbanBoards());
      })
    );
  }

  static getKanbanBoardObservable(id: string): Observable<any> {
    return concat(of(0), interval(1000)).pipe(
      switchMap(() => {
        return from(KanbanAPI.getKanbanBoard(id));
      })
    );
  }

  static getKanbanBoardTasksObservable(
    boardId: string,
    categoryId: string
  ): Observable<any> {
    return concat(of(0), interval(1000)).pipe(
      switchMap(() => {
        return from(KanbanAPI.getKanbanBoardTasks(boardId, categoryId));
      })
    );
  }
}
