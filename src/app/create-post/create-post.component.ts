import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PostService } from "src/services/post.service";
import { AuthService } from "src/services/auth.service";
import { Router } from "@angular/router";
import { NzModalService, NzNotificationService } from "ng-zorro-antd";

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

  sentence: string = "";
  common_words = "өө , shit , fuck";

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private auth: AuthService,
    private router: Router,
    private modalService: NzModalService,
    private notification: NzNotificationService
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
      is_thanks: [false],
      agree: [false]
    });
  }

  onSelect(value: string): void {
    this.tagged.push(value);
  }

  getUncommon(sentence, common) {
    var wordArr = sentence.match(/\w+/g),
      commonObj = {},
      uncommonArr = 0,
      word,
      i;

    common = common.split(",");
    for (i = 0; i < common.length; i++) {
      commonObj[common[i].trim()] = true;
    }

    for (i = 0; i < wordArr.length; i++) {
      word = wordArr[i].trim().toLowerCase();
      if (commonObj[word]) {
        uncommonArr = 1;
      }
    }
    return uncommonArr;
  }

  newPost(): void {
    for (const i in this.postForm.controls) {
      this.postForm.controls[i].markAsDirty();
      this.postForm.controls[i].updateValueAndValidity();
    }
    if (this.postForm.invalid || !this.postForm.controls.agree.value) {
      this.notification.blank("Анхаар!", "Зөрчлийн тухай хуульийг уншина уу?");
      return;
    }
    console.log(this.tagged);
    // if (this.postForm.controls.body.value.search("тэнэг") != -1) {
    //   console.log("bainaaaaaaaaaaaaaa");
    // }
    let data = {
      user: this.auth.getUser,
      tagged_user: this.tagged,
      body: this.postForm.controls.body.value,
      images: [],
      is_public: this.postForm.controls.is_public.value,
      is_vissible: this.postForm.controls.is_visible.value,
      dislike_cnt: 0,
      like_cnt: 0,
      perfor_code: "sent",
      is_thanks: this.postForm.controls.is_thanks.value,
      deadline: this.postForm.controls.deadline.value
    };
    if (
      this.getUncommon(this.postForm.controls.body.value, this.common_words) !=
      1
    ) {
      this.postService.createPost(data).subscribe(res => {
        if (res) {
          console.log(res);
          this.router.navigate(["app", "posts"]);
        }
      });
    } else {
      this.notification.create(
        "error",
        "Анхааруулга",
        "Та ёс бус үг хэрэглэсэн учир үүнийг нийтлэх боломжгүй тул засаж бичнэ үү?"
      );
    }
  }

  info(): void {
    this.modalService.info({
      nzTitle: "Зөрчлийн тухай хууль",
      nzContent:
        '<p >&nbsp Та өөрийн санал хүсэлтээ илгээхдээ өөрийн нэрийг нууцлах шаардлагатай бол цахим хаяг эсвэл утасны дугаараа үлдээгээрэй. Ингэснээр таньтай эргэн холбогдож асуудлыг тань шийдвэрлэх болно. Иргэн та "Эрүүгийн хуулийн 110 дугаар зүйлийн 1.1-1.6 заалт", "Эрүүгийн хуулийн 111 дугаар зүйлийн 2.1-2.9 заалт", "Эрүүгийн хуулийн 110, 111 дүгээр зүйлд заасан гэмт хэргүүдийг ойролцоо төрлийн гэмт хэргээс ялган зүйлчлэх 3.1-3.9 заалтыг" зөрчихгүй байхыг хүсье</p>',
      nzOnOk: () => console.log("Info OK")
    });
  }
}
