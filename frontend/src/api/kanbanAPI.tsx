import axios from "axios";
import { Observable, interval, from, concat, of } from "rxjs";
import { switchMap, catchError } from "rxjs/operators";
import { API_URL } from "./apiConfig";
import { KanbanBoard, KanbanBoardUpdate } from "../utilities/types";
import { BoardApiError } from "../utilities/errors";

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

  // Step 1: Create an empty board (no details yet)
  static async createKanbanBoard(): Promise<KanbanBoard> {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/kanbans`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data as KanbanBoard;
  }

  // Step 2: Use the returned board ID to populate the details
  static async updateKanbanBoard(
    id: number,
    data: Partial<KanbanBoardUpdate>
  ): Promise<KanbanBoard> {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/kanbans/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data as KanbanBoard;
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

  static createKanbanBoardObservable(): Observable<KanbanBoard> {
    return from(KanbanAPI.createKanbanBoard());
  }

  static updateKanbanBoardObservable(
    id: number,
    data: Partial<KanbanBoard>
  ): Observable<KanbanBoard> {
    return from(KanbanAPI.updateKanbanBoard(id, data));
  }

  static createKanbanBoardWithDetailsObservable(
    data: Partial<KanbanBoard>
  ): Observable<KanbanBoard> {
    return from(KanbanAPI.createKanbanBoard()).pipe(
      switchMap((board) => {
        return from(KanbanAPI.updateKanbanBoard(board.id, data)).pipe(
          catchError((error) => {
            throw new BoardApiError(
              "Error creating Kanban board",
              board,
              error
            );
          })
        );
      })
    );
  }

  static deleteKanbanBoardObservable(id: number): Observable<void> {
    return from(KanbanAPI.deleteKanbanBoard(id));
  }

  // Add a function to delete a Kanban board
  static async deleteKanbanBoard(id: number): Promise<void> {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/kanbans/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
