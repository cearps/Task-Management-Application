import axios from "axios";
import { Observable, interval, from, concat, of } from "rxjs";
import { switchMap } from "rxjs/operators";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default class UserAPI {
  static async getUser(id: string) {
    return axios.get(`${baseUrl}/users/${id}`);
  }

  static getUserObservable(id: string): Observable<any> {
    return concat(of(0), interval(1000)).pipe(
      switchMap(() => {
        return from(UserAPI.getUser(id));
      })
    );
  }
}
