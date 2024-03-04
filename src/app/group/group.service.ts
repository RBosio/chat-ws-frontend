import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, catchError, map, throwError } from "rxjs"
import { BASE_URL } from "../environments/environment"

@Injectable({
  providedIn: "root",
})
export class GroupService {
  constructor(private http: HttpClient) {}

  getGroup(name: string): Observable<any> {
    return this.http
      .get(BASE_URL + "group/" + name, { withCredentials: true })
      .pipe(
        map((res: any) => {
          return res
        }),
        catchError((err) => {
          return throwError(err.error.message)
        })
      )
  }
  sendMessage(
    message: string,
    groupId: number,
    userSendId: number
  ): Observable<any> {
    return this.http
      .post(
        BASE_URL + "message",
        {
          message,
          groupId,
          userSendId,
        },
        { withCredentials: true }
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
}
