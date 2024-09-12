import axios from "axios";
import { Observable, interval, from, concat, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { API_URL } from "./apiConfig";

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
  static getTaskCommentsObservable(taskId: string): Observable<any> {
    return concat(of(0), interval(1000)).pipe(
      switchMap(() => {
        return from(TaskAPI.getTaskComments(taskId));
      })
    );
  }

  // Observable for task assignees with periodic updates
  static getTaskAssigneesObservable(taskId: string): Observable<any> {
    return concat(of(), interval(1000)).pipe(
      switchMap(() => {
        return from(TaskAPI.getTaskAssignees(taskId));
      })
    );
  }

  // Create a task on a specific board
  static async createTask(boardId: string, taskData: any) {
    const token = localStorage.getItem("token");

    // Ensure token exists before making the request
    if (!token) {
      throw new Error("No authorization token found");
    }

    // Log the data that is being sent to the backend
    console.log(`Sending POST request to ${API_URL}/kanbans/${boardId}/tasks with data:`, taskData);

    try {
      const response = await axios.post(`${API_URL}/kanbans/${boardId}/tasks`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Log the response from the backend
      console.log("Task creation response:", response.data);

      // Return the new created task data
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  // Update an existing task
  static async updateTask(taskId: string, taskData: any) {
    const token = localStorage.getItem("token");

    // Ensure token exists before making the request
    if (!token) {
      throw new Error("No authorization token found");
    }

    console.log(`Sending PUT request to ${API_URL}/tasks/${taskId} with data:`, taskData);

    try {
      const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Log the response from the backend
      console.log("Task update response:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }
}
