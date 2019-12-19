import { Component, OnInit } from "@angular/core";
import { PostService } from "src/services/post.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  loading: boolean = true;
  listData: Array<any> = [];

  constructor(private postService: PostService) {
    this.postService.getAllPost().subscribe(res => {
      this.listData = res;
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
}
