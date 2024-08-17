import axios from "axios";
import { Observable, interval, from, concat, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { LoginResponse, NewUserData, SignUpResponse } from "../utilities/types";
import { API_URL } from "./apiConfig";

export default class UserAPI {
  static async getUser(id: string) {
    return axios.get(`${API_URL}/users/${id}`);
  }

  static async createUser(data: NewUserData) {
    const jsonData = JSON.stringify({
      userTag: data.userTag,
      email: data.email,
      password: data.password,
    });

    // headers are required for POST requests
    const response = await axios.post(`${API_URL}/auth/signup`, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data as SignUpResponse;
  }

  static async loginUser(data: { email: string; password: string }) {
    const jsonData = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    const response = await axios.post(`${API_URL}/auth/login`, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data as LoginResponse;
  }

  static getUserObservable(id: string): Observable<any> {
    // TODO
    return concat(of(0), interval(1000)).pipe(
      switchMap(() => {
        return from(UserAPI.getUser(id));
      })
    );
  }

  static createUserObservable(data: NewUserData): Observable<SignUpResponse> {
    return from(UserAPI.createUser(data));
  }

  static loginUserObservable(data: {
    email: string;
    password: string;
  }): Observable<LoginResponse> {
    return from(UserAPI.loginUser(data));
  }
}
