import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PostService } from "src/services/post.service";
import { AuthService } from "src/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"]
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  inputValue: string;
  users: Array<any> = [];
  tagged: Array<any> = [];
  valueWith = (data: {
    _id: string;
    avatar: string;
    f_name: string;
    l_name: string;
  }) => data.l_name + "-" + data.f_name;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private auth: AuthService,
    private router: Router
  ) {
    this.auth.getAllUser().subscribe((res: any) => {
      this.users = res;
    });
  }

  ngOnInit() {
    this.postForm = this.fb.group({
      body: [null, [Validators.required]],
      deadline: [null],
      is_public: [false],
      is_visible: [false],
      is_thanks: [false]
    });
  }

  onSelect(value: string): void {
    this.tagged.push(value);
  }

  newPost(): void {
    for (const i in this.postForm.controls) {
      this.postForm.controls[i].markAsDirty();
      this.postForm.controls[i].updateValueAndValidity();
    }
    // console.log(this.postForm.controls.body.value);
    console.log(this.tagged);
    let data = {
      user: this.auth.getUser,
      tagged_user: this.tagged,
      body: this.postForm.controls.body.value,
      images: [],
      is_public: this.postForm.controls.is_public.value,
      is_vissible: this.postForm.controls.is_visible.value,
      dislike_cnt: 0,
      like_cnt: 0,
      perfor_code: "unsuccess",
      is_thanks: this.postForm.controls.is_thanks.value,
      deadline: this.postForm.controls.deadline.value
    };
    this.postService.createPost(data).subscribe(res => {
      if (res) {
        console.log(res);
        this.router.navigate(["app", "posts"]);
      }
    });
  }
}
