import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
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
  mainData: Array<any> = [];
  filteredData: Array<any> = [];
  filterForm: FormGroup;

  constructor(
    private postService: PostService,
    private auth: AuthService,
    private notification: NzNotificationService
  ) {
    this.getData();
    this.filterForm = new FormGroup({
      postType: new FormControl(null),
      postStatus: new FormControl(null),
      postDeadline: new FormControl(null)
    });
  }
  ngOnInit(): void {}
  getData(): void {
    this.postService.getUserIdPosts(this.auth.getUser.id).subscribe(res => {
      this.data1 = res;
      this.mainData = res;
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
    this.data1 = this.filteredData;
  }
  resetData(): void {
    this.filterForm.reset();
    this.data1 = this.mainData;
  }
}
