import { Injectable } from "@angular/core"
import { BASE_URL } from "../environments/environment"
import { Observable, catchError, map, throwError } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { UserIResponse } from "../models/user.model"

@Injectable({
  providedIn: "root",
})
export class FriendService {
  constructor(private http: HttpClient) {}

  getFriends(userId: number): Observable<UserIResponse> {
    return this.http
      .get(BASE_URL + "user/" + userId, { withCredentials: true })
      .pipe(
        map((res: any) => {
          return res
        }),
        catchError((err) => {
          return throwError(err.error.message)
        })
      )
  }
}
