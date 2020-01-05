import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PostService } from "src/services/post.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/services/auth.service";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-private-information",
  templateUrl: "./private-information.component.html",
  styleUrls: ["./private-information.component.css"]
})
export class PrivateInformationComponent implements OnInit {
  data1: Array<any> = [];
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private notification: NzNotificationService,
    private nzMessageService: NzMessageService
  ) {
    this.getData();
  }
  ngOnInit(): void {}
  getData(): void {
    this.postService.getUserIdPosts(this.auth.getUser.id).subscribe(res => {
      this.data1 = res;
    });
  }
  delete(id: any) {
    this.postService.deletePost(id).subscribe(res => {
      if (res) {
        this.getData();
        this.notification.create(
          "success",
          "Амжилттай",
          "Санал хүсэлт устгагдлаа"
        );
      } else {
        this.notification.create(
          "error",
          "Алдаа",
          "Өгөгдлийн сантай холбогдож чадсангүй"
        );
      }
    });
  }

  postConfirm(id: string, status: string): void {
    this.postService.postConfirm({ id, perfor_code: status }).subscribe(res => {
      if (res) {
        this.getData();
        this.notification.create(
          "success",
          "Амжилттай",
          "Үйлдэл амжилттай биелэгдлээ"
        );
      } else {
        this.notification.create(
          "error",
          "Алдаа",
          "Өгөгдлийн сантай холбогдож чадсангүй"
        );
      }
    });
  }
}
