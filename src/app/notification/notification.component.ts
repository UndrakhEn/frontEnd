import { Component, OnInit } from "@angular/core";
import { PostService } from "src/services/post.service";
import { AuthService } from "src/services/auth.service";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"]
})
export class NotificationComponent implements OnInit {
  filteredData: Array<any> = [];
  filterForm: FormGroup;
  data1: Array<any> = [];
  mainData: Array<any> = [];
  listData: Array<any> = [];
  taggedPost: Array<any> = [];
  sent: Array<any> = [];
  constructor(
    private postService: PostService,
    private auth: AuthService,
    private notification: NzNotificationService,
    private router: Router
  ) {
    this.filterForm = new FormGroup({
      postType: new FormControl(null),
      postStatus: new FormControl(null),
      postDeadline: new FormControl(null)
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.postService.getTagged().subscribe(res => {
      this.taggedPost = res;
      this.mainData = res;
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

  filterData(): void {
    this.filteredData = [];
    console.log("filtering...");
    this.mainData.forEach(i => {
      if (
        this.filterForm.controls.postType.value != null &&
        this.filterForm.controls.postStatus.value != null &&
        this.filterForm.controls.postDeadline.value != null
      ) {
        if (
          i.is_thanks === this.filterForm.controls.postType.value &&
          i.perfor_code == this.filterForm.controls.postStatus.value &&
          i.deadline >=
            this.filterForm.controls.postDeadline.value[0]
              .toISOString()
              .substring(0, 10) &&
          i.deadline <=
            this.filterForm.controls.postDeadline.value[1]
              .toISOString()
              .substring(0, 10)
        ) {
          this.filteredData.push(i);
        }
      } else if (
        this.filterForm.controls.postType.value != null &&
        this.filterForm.controls.postStatus.value != null
      ) {
        if (
          i.is_thanks === this.filterForm.controls.postType.value &&
          i.perfor_code == this.filterForm.controls.postStatus.value
        ) {
          this.filteredData.push(i);
        }
      } else if (
        this.filterForm.controls.postType.value != null &&
        this.filterForm.controls.postDeadline.value != null
      ) {
        if (
          i.is_thanks === this.filterForm.controls.postType.value &&
          i.deadline >=
            this.filterForm.controls.postDeadline.value[0]
              .toISOString()
              .substring(0, 10) &&
          i.deadline <=
            this.filterForm.controls.postDeadline.value[1]
              .toISOString()
              .substring(0, 10)
        ) {
          this.filteredData.push(i);
        }
      } else if (
        this.filterForm.controls.postStatus.value != null &&
        this.filterForm.controls.postDeadline.value != null
      ) {
        if (
          i.perfor_code == this.filterForm.controls.postStatus.value &&
          i.deadline >=
            this.filterForm.controls.postDeadline.value[0]
              .toISOString()
              .substring(0, 10) &&
          i.deadline <=
            this.filterForm.controls.postDeadline.value[1]
              .toISOString()
              .substring(0, 10)
        ) {
          this.filteredData.push(i);
        }
      } else if (this.filterForm.controls.postDeadline.value != null) {
        if (
          i.is_thanks === this.filterForm.controls.postType.value ||
          i.perfor_code == this.filterForm.controls.postStatus.value ||
          (i.deadline >=
            this.filterForm.controls.postDeadline.value[0]
              .toISOString()
              .substring(0, 10) &&
            i.deadline <=
              this.filterForm.controls.postDeadline.value[1]
                .toISOString()
                .substring(0, 10))
        )
          this.filteredData.push(i);
      } else {
        if (
          i.is_thanks === this.filterForm.controls.postType.value ||
          i.perfor_code == this.filterForm.controls.postStatus.value
        )
          this.filteredData.push(i);
      }
    });
    this.taggedPost = this.filteredData;
  }
  resetData(): void {
    this.filterForm.reset();
    this.taggedPost = this.mainData;
  }
}
