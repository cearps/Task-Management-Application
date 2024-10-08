import axios from "axios";
import { Observable, interval, from, concat, of } from "rxjs";
import { switchMap, catchError, map } from "rxjs/operators";
import {
  LoginResponse,
  NewUserData,
  SignUpResponse,
  User,
} from "../utilities/types";
import { API_URL } from "./apiConfig";
import { ApiError } from "../utilities/errors";

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

    if (response.status !== 200) {
      throw new ApiError(response.data.description, response.status);
    }

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

    if (response.status === 200 && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("firstLogin", response.data.firstLogin.toString());
    } else {
      throw new ApiError(response.data.description, response.status);
    }

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

  static isAuthenticatedObservable(): Observable<boolean> {
    return concat(of(0), interval(10000)).pipe(
      switchMap(() => {
        return from(UserAPI.getUser()).pipe(
          map(() => true),
          catchError(() => of(false))
        );
      })
    );
  }

  static subscribeIsAuthenticated() {
    return this.isAuthenticatedObservable().subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        localStorage.removeItem("token");

        // redirect to login page
        window.location.href = "/accounts/login";
      }
    });
  }

  static subscribeIsNotAuthenticated() {
    return this.isAuthenticatedObservable().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        // redirect to boards page
        window.location.href = "/boards";
      }
    });
  }

  static subscribeIsAuthenticatedDecision() {
    return this.isAuthenticatedObservable().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        // redirect to boards page
        window.location.href = "/boards";
      } else {
        // redirect to login page
        window.location.href = "/accounts/login";
      }
    });
  }

  static logout() {
    localStorage.removeItem("token");
  }
}
