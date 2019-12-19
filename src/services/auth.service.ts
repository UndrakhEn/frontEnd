import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private URL = "http://localhost:3000/api/user/check";
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  errorData: {};
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get getUser(): any {
    return this.currentUserSubject.value;
  }

  login(own_code: string, password: string) {
    return this.http
      .post<any>(this.URL, {
        own_code,
        password
      })
      .pipe(
        map(res => {
          if (res.code !== 200) {
            return null;
          }
          localStorage.setItem("currentUser", JSON.stringify(res.result));
          this.currentUserSubject.next(res.result);
          return res.result;
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("an error occured: ", error.error.message);
    } else {
      console.error(`Error  ${error.status} ` + ` body ${error.error}`);
    }
    this.errorData = {
      errorTitle: "Oops failed",
      errorDesc: "something bad happened"
    };
    return throwError(this.errorData);
  }
}
