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
    const jsonData = JSON.stringify({
      fullName: data.username,
      email: data.email,
      password: data.password,
    });

    // headers are required for POST requests
    return axios.post(`${API_URL}/auth/signup`, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static async loginUser(data: { email: string; password: string }) {
    const jsonData = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    return axios.post(`${API_URL}/auth/login`, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static getUserObservable(id: string): Observable<any> {
    return concat(of(0), interval(1000)).pipe(
      switchMap(() => {
        return from(UserAPI.getUser(id));
      })
    );
  }

  static createUserObservable(data: NewUserData): Observable<any> {
    return from(UserAPI.createUser(data));
  }

  static loginUserObservable(data: {
    email: string;
    password: string;
  }): Observable<any> {
    return from(UserAPI.loginUser(data));
  }
}
