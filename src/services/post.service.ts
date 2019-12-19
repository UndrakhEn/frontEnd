import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PostService {
  private URL = "http://localhost:3000/api/post/get";
  private URL2 = "http://localhost:3000/api/post/getId";
  private URL3 = "http://localhost:3000/api/comment/getPostId";
  private URL4 = "http://localhost:3000/api/comment/create";
  private URL5 = "http://localhost:3000/api/post/create";

  constructor(private http: HttpClient) {}

  getAllPost() {
    return this.http.post<any>(this.URL, {}).pipe(
      map(res => {
        if (res.code !== 200) {
          return null;
        }
        return res.result;
      })
    );
  }
  getPost(id: any) {
    return this.http
      .post<any>(this.URL2, { id })
      .pipe(
        map(res => {
          if (res.code !== 200) {
            return null;
          }
          return res.result;
        })
      );
  }
  getIdComment(post_id: any) {
    return this.http
      .post<any>(this.URL3, { post_id })
      .pipe(
        map(res => {
          if (res.code !== 200) {
            return null;
          }
          return res.result;
        })
      );
  }

  createComment(comment: object) {
    return this.http.post<any>(this.URL4, comment).pipe(
      map(res => {
        if (res.code !== 200) {
          return null;
        }
        return res.result;
      })
    );
  }

  createPost(post: object) {
    return this.http.post<any>(this.URL5, post).pipe(
      map(res => {
        if (res.code !== 200) {
          return null;
        }
        return res.result;
      })
    );
  }
}
