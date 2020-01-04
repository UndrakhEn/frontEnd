import { Component, OnInit } from "@angular/core";
import { PostService } from "src/services/post.service";
import { AuthService } from "src/services/auth.service";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"]
})
export class NotificationComponent implements OnInit {
  listData: Array<any> = [];
  taggedPost: Array<any> = [];
  is_send: boolean = false;
  constructor(
    private postService: PostService,
    private auth: AuthService,
    private notification: NzNotificationService
  ) {
    this.postService.getAllPost().subscribe(res => {
      this.listData = res;
      this.listData.forEach(i => {
        i.tagged_user.forEach(j => {
          if (j._id == this.auth.getUser._id) this.taggedPost.push(i);
        });
      });
      console.log(this.taggedPost);
    });
  }

  ngOnInit() {}

  send(id: any) {
    this.is_send = true;
    console.log("send", id);
    this.notification.create(
      "success", //error , success, info
      "Амжилттай",
      "Санал хүсэлтийн хариу амжилттай илгээгдлээ"
    );
  }
}
