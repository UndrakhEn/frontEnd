import { Component, OnInit } from "@angular/core";
import { PostService } from "src/services/post.service";
import { AuthService } from "src/services/auth.service";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Router } from "@angular/router";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"]
})
export class NotificationComponent implements OnInit {
  listData: Array<any> = [];
  taggedPost: Array<any> = [];
  sent: Array<any> = [];
  constructor(
    private postService: PostService,
    private auth: AuthService,
    private notification: NzNotificationService,
    private router: Router
  ) {
    console.log("constructor");
  }

  ngOnInit() {
    console.log("init");
    this.postService.getTagged().subscribe(res => {
      this.sent = res;
      // for (let index = 0; index < this.sent.length; index++) {
      //   const element = this.sent[index];
      //   if (element.perfor_code == "sent") {
      //     console.log(element);
      //     this.postService
      //       .postConfirm({
      //         id: element._id,
      //         perfor_code: "seen"
      //       })
      //       .subscribe(res => console.log(res));
      //     element.perfor_code = "seen";
      //   }
      // }
      this.taggedPost = this.sent;
    });
  }

  getData(): void {
    this.postService.getTagged().subscribe(res => {
      this.taggedPost = res;
    });
  }
  postConfirm(id: string): void {
    this.postService
      .postConfirm({ id, perfor_code: "pending" })
      .subscribe(res => {
        if (res) {
          this.getData();
          this.notification.create(
            "success",
            "Амжилттай",
            "Санал хүсэлтийг биелүүлсэн таньд баярлалаа"
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

  seePost(id: string): void {
    this.postService
      .postConfirm({
        id,
        perfor_code: "seen"
      })
      .subscribe(res => {
        if (res) this.router.navigate(["app", "post", id]);
      });
  }
}
