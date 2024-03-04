import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, map, throwError } from "rxjs"
import { UserLoginI } from "../models/user.model"
import { BASE_URL } from "../environments/environment"

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(user: UserLoginI) {
    return this.http
      .post(BASE_URL + "auth/login", user, { withCredentials: true })
      .pipe(
        map((res: any) => {
          return res
        }),
        catchError((err) => {
          return throwError(err.error.message)
        })
      )
  }

  signup(user: UserLoginI) {
    return this.http.post(BASE_URL + "auth/signup", user).pipe(
      map((res) => {
        return res
      }),
      catchError((err) => {
        return throwError(err.error.message)
      })
    )
  }
}
