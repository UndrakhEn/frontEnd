import { Component, OnInit } from "@angular/core";
import { PostService } from "src/services/post.service";
import { AuthService } from "src/services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  loading: boolean = true;
  listData: Array<any> = [];
  data: any;
  data1: Array<any> = [];

  constructor(
    private postService: PostService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {
    this.getData();
  }
  getData(): void {
    if (this.auth.getUser.own_code.length === 10) {
      this.postService.getStudentAllPost().subscribe(res => {
        this.listData = res;
      });
    } else {
      this.postService.getAllPost().subscribe(res => {
        this.listData = res;
      });
    }
  }
  like(id) {
    this.postService.updateLike(id, this.auth.getUser.id).subscribe(res => {
      this.getData();
    });
  }
  dislike(id) {
    this.postService.updateDisLike(id, this.auth.getUser.id).subscribe(res => {
      this.getData();
    });
  }
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
}
