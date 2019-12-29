import { Component, OnInit } from "@angular/core";
import { PostService } from "src/services/post.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/services/auth.service";

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

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.post_id = this.route.snapshot.paramMap.get("id");
    this.postService.getPost(this.post_id).subscribe(res => {
      this.postData = res[0];
    });
    this.postService.getIdComment(this.post_id).subscribe(res => {
      this.commentData = res;
    });
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
        user_id: this.auth.getUser._id,
        dislike_cnt: "0",
        like_cnt: "0",
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
