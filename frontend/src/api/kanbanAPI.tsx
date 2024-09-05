import axios from "axios";
import { Observable, interval, from, concat, of } from "rxjs";
import { switchMap, catchError } from "rxjs/operators";
import { API_URL } from "./apiConfig";
import { KanbanBoard } from "../utilities/types";

export default class KanbanAPI {
  static async getKanbanBoards(): Promise<KanbanBoard[]> {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/kanbans`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as KanbanBoard[];
  }

  static async getKanbanBoard(id: string): Promise<KanbanBoard> {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/kanbans/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as KanbanBoard;
  }

  static async createKanbanBoard(name: string, startDate: string, dueDate: string, description: string): Promise<KanbanBoard> {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/kanbans`, 
      { name, startDate, dueDate, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data as KanbanBoard;
  }
  

  static getKanbanBoardsObservable(): Observable<KanbanBoard[]> {
    return concat(of(0), interval(1000)).pipe(
      switchMap(() => from(KanbanAPI.getKanbanBoards())),
      catchError((error) => {
        console.error("Error fetching Kanban boards:", error);
        return of([]); // Return an empty array in case of error
      })
    );
  }

  static getKanbanBoardObservable(id: string): Observable<KanbanBoard | null> {
    return concat(of(0), interval(1000)).pipe(
      switchMap(() => from(KanbanAPI.getKanbanBoard(id))),
      catchError((error) => {
        console.error(`Error fetching Kanban board with id ${id}:`, error);
        return of(null); // Return null or some fallback value in case of error
      })
    );
  }
}
