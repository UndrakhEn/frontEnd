import { Component, OnInit } from "@angular/core";
import { NzModalService } from "ng-zorro-antd/modal";
import { AuthService } from "src/services/auth.service";
import { Router } from "@angular/router";
import { NzStatisticModule } from "ng-zorro-antd/statistic";
import { PostService } from "src/services/post.service";
import { element } from "protractor";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  element1: number;
  element2: number;
  listData: Array<any> = [];
  constructor(
    private modal: NzModalService,
    private auth: AuthService,
    private router: Router,
    private postService: PostService
  ) {
    this.postService.getAllPost().subscribe(res => {
      this.element1 = res.length;
    });
    this.postService.getThanks().subscribe(res => {
      this.element2 = res.length;
    });
  }
  ngOnInit() {}
  logout() {
    this.auth.logout();
    this.router.navigate(["login"]);
  }

  showconfirm(): void {
    this.modal.confirm({
      nzTitle: "<b>Анхаар</b>",
      nzContent: "<p>Та системээс гарах гэж байна</p>",
      nzOkText: "Гарах",
      nzCancelText: "Болих",
      nzOnOk: () => this.logout()
    });
  }
}
