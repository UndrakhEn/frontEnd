import { Component, OnInit } from "@angular/core";
import { PostService } from "src/services/post.service";
import { AuthService } from "src/services/auth.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  loading: boolean = true;
  listData: Array<any> = [];
  data: any;

  constructor(private postService: PostService, private auth: AuthService) {
    if (this.auth.getUser.own_code.length === 10) {
      this.postService.getStudentAllPost().subscribe(res => {
        this.listData = res;
        console.log(res);
      });
    } else {
      this.postService.getAllPost().subscribe(res => {
        this.listData = res;
        console.log(res);
      });
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
}
