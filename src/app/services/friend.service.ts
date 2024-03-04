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
      .get(BASE_URL + "friendRequest/accepted/" + userId, {
        withCredentials: true,
      })
      .pipe(
        map((res: any) => {
          return res
        }),
        catchError((err) => {
          return throwError(err.error.message)
        })
      )
  }

  getFriendRequests(userId: number): Observable<UserIResponse> {
    return this.http
      .get(BASE_URL + "friendRequest/waiting/" + userId, {
        withCredentials: true,
      })
      .pipe(
        map((res: any) => {
          return res
        }),
        catchError((err) => {
          return throwError(err.error.message)
        })
      )
  }

  acceptFriendRequests(frId: number): Observable<any> {
    return this.http
      .patch(
        BASE_URL + "friendRequest/" + frId,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        map((res: any) => {
          return res
        }),
        catchError((err) => {
          return throwError(err.error.message)
        })
      )
  }

  getUsers(): Observable<UserIResponse> {
    return this.http.get(BASE_URL + "user", { withCredentials: true }).pipe(
      map((res: any) => {
        return res
      }),
      catchError((err) => {
        return throwError(err.error.message)
      })
    )
  }

  addFriend(newFriend: {
    userSendId: number
    userReceiveId: number
  }): Observable<UserIResponse> {
    return this.http
      .post(BASE_URL + "friendRequest", newFriend, { withCredentials: true })
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
