import { Component, OnInit } from "@angular/core";
import { PostService } from "src/services/post.service";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/services/auth.service";
import { filter, pairwise } from "rxjs/operators";
import { Post } from "./post";
@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  post_id: string = "";
  loading: boolean = true;
  postData: any = {};
  commentData: Array<any> = [];
  commentForm: FormGroup;
  user: any = {};
  first_name: string = "";
  commentName: any = {};
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.getData();
  }
  getData() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        localStorage.setItem("prevUrl", this.router.url);
      }
    });
    this.post_id = this.route.snapshot.paramMap.get("id");
    this.postService.getPost(this.post_id).subscribe(res => {
      this.postData = res[0];
      this.user = this.postData.user;
      this.first_name = this.postData.user.f_name;
    });
    this.postService.getIdComment(this.post_id).subscribe(res => {
      this.commentData = res;
      console.log(this.commentData);
    });
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
  back() {
    console.log("back to ", localStorage.getItem("prevUrl"));
    this.router.navigate([localStorage.getItem("prevUrl")]);
  }
  ngOnInit() {
    this.commentForm = this.fb.group({
      comment: [null, [Validators.required]]
    });
  }

  writeComment() {
    this.postService
      .createComment({
        post_id: this.post_id,
        body: this.commentForm.controls.comment.value,
        parent_id: "",
        user: this.auth.getUser,
        dislike_cnt: 0,
        like_cnt: 0,
        replies: []
      })
      .subscribe(res => {
        if (res) {
          this.commentForm.reset();
          this.postService.getIdComment(this.post_id).subscribe(res => {
            this.commentData = res;
          });
        }
      });
  }
}
