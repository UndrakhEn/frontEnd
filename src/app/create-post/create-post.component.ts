import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { create } from "domain";
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

  // webFrameworks = [
  //   {
  //     name: "React",
  //     type: "JavaScript",
  //     icon: "https://zos.alipayobjects.com/rmsportal/LFIeMPzdLcLnEUe.svg"
  //   },
  //   {
  //     name: "Angular",
  //     type: "JavaScript",
  //     icon: "https://zos.alipayobjects.com/rmsportal/PJTbxSvzYWjDZnJ.png"
  //   },
  //   {
  //     name: "Dva",
  //     type: "Javascript",
  //     icon: "https://zos.alipayobjects.com/rmsportal/EYPwSeEJKxDtVxI.png"
  //   },
  //   {
  //     name: "Flask",
  //     type: "Python",
  //     icon: "https://zos.alipayobjects.com/rmsportal/xaypBUijfnpAlXE.png"
  //   }
  // ];

  users = [
    {
      _id: "5df89930af20db0a189609e9",
      avatar: "",
      f_name: "Ундрах",
      l_name: "Энхбаатар",
      own_code: "M.IT16D087",
      register: "ЛЮ98080601",
      phone: "94152470",
      password: "undrakh",
      type: "student",
      type_meaning: "Мэдээлэл зүй",
      __v: 0
    },
    {
      _id: "5df899c8af20db0a189609ea",
      avatar: "",
      f_name: "Баярсайхан",
      l_name: "Отгонбаяр",
      own_code: "M.IT15D133",
      register: "ЙК98013033",
      phone: "99479654",
      password: "bayrsaikhan",
      type: "student",
      type_meaning: "Мэдээлэл зүй",
      __v: 0
    },
    {
      _id: "5df899fdaf20db0a189609eb",
      avatar: "",
      f_name: "Долгоржав",
      l_name: "Чинбат",
      own_code: "M.IT408",
      register: "ИЗ9876543",
      phone: "99519951",
      password: "teacher",
      type: "teacher",
      type_meaning: "Мэдээлэл зүй",
      __v: 0
    },
    {
      _id: "5df89a82af20db0a189609ec",
      avatar: "",
      f_name: "Нямсүрэн",
      l_name: "Нямаа",
      own_code: "M.IT406",
      register: "ЫО98775428",
      phone: "88518851",
      password: "teacher2",
      type: "teacher",
      type_meaning: "Мэдээлэл зүй",
      __v: 0
    },
    {
      _id: "5df89ae2af20db0a189609ed",
      avatar: "",
      f_name: "Сарантуяа",
      l_name: "Баттулга",
      own_code: "M.IT16D265",
      register: "ЛҮ98343756",
      phone: "55674368",
      password: "student",
      type: "student",
      type_meaning: "Мэдээлэл зүй",
      __v: 0
    }
  ];

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
  ) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      body: [null, [Validators.required]],
      deadline: [null],
      is_visible: [false],
      is_thanks: [false]
    });
  }

  onSelect(value: string): void {
    console.log(value);
  }

  newPost(): void {
    for (const i in this.postForm.controls) {
      this.postForm.controls[i].markAsDirty();
      this.postForm.controls[i].updateValueAndValidity();
    }
    console.log(this.postForm.controls.body.value);
    let data = {
      user_id: this.auth.getUser._id,
      tagged_user: [],
      body: this.postForm.controls.body.value,
      images: [],
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
