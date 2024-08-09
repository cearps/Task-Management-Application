import axios from "axios";
import { Observable, interval, from, concat, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { NewUserData } from "../utilities/types";
import { API_URL } from "./apiConfig";

export default class UserAPI {
  static async getUser(id: string) {
    return axios.get(`${API_URL}/users/${id}`);
  }

  static async createUser(data: NewUserData) {
    return axios.post(`${API_URL}/users`, data);
  }

  static async createUser(data: NewUserData) {
    return axios.post(`${API_URL}/users`, data);
  }

  static getUserObservable(id: string): Observable<any> {
    return concat(of(0), interval(1000)).pipe(
      switchMap(() => {
        return from(UserAPI.getUser(id));
      })
    );
  }
}
