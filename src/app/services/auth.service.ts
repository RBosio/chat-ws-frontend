import { HttpClient } from "@angular/common/http"
import { EventEmitter, Injectable } from "@angular/core"
import { catchError, map, of, throwError } from "rxjs"
import { UserLoginI } from "../models/user.model"
import { BASE_URL } from "../environments/environment"
import { Router } from "@angular/router"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  logged: EventEmitter<boolean> = new EventEmitter()

  isLogged() {
    return this.http
      .get(BASE_URL + "auth/profile", { withCredentials: true })
      .pipe(
        map((res) => {
          return true
        }),
        catchError(() => {
          return of(false)
        })
      )
  }

  profile() {
    return this.http
      .get(BASE_URL + "auth/profile", { withCredentials: true })
      .pipe(
        map((res) => {
          return res
        }),
        catchError((err) => {
          return throwError(err.error.message)
        })
      )
  }

  login(user: UserLoginI) {
    return this.http
      .post(BASE_URL + "auth/login", user, { withCredentials: true })
      .pipe(
        map(async (res: any) => {
          this.logged.emit(true)
          localStorage.setItem("logged", "true")
          localStorage.setItem("sub", res.sub)

          return res
        }),
        catchError((err) => {
          return throwError(err.error.message)
        })
      )
  }

  logout() {
    return this.http
      .post(BASE_URL + "auth/logout", {}, { withCredentials: true })
      .pipe(
        map((res: any) => {
          this.logged.emit(false)
          localStorage.clear()

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
