import axios from "axios";
import { Observable, interval, from, concat, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import {
  LoginResponse,
  NewUserData,
  SignUpResponse,
  User,
} from "../utilities/types";
import { API_URL } from "./apiConfig";

export default class UserAPI {
  static async getUser() {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
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

  static getUserObservable(): Observable<User> {
    return concat(of(0), interval(1000)).pipe(
      switchMap(() => {
        return from(UserAPI.getUser());
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
