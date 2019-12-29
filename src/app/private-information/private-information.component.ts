import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/services/auth.service";
import { NzNotificationService } from "ng-zorro-antd/notification";

const userList = ["U", "Lucy", "Tom", "Edward"];
const colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
@Component({
  selector: "app-private-information",
  templateUrl: "./private-information.component.html",
  styleUrls: ["./private-information.component.css"]
})
export class PrivateInformationComponent implements OnInit {
  userForm: FormGroup;

  text: string = userList[3];
  color: string = colorList[3];

  constructor(
    private fb: FormBuilder,
    private autService: AuthService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      type: [this.autService.getUser.type_meaning, [Validators.required]],
      userName: [
        this.autService.getUser.l_name + " " + this.autService.getUser.f_name,
        [Validators.required]
      ],
      ownCode: [this.autService.getUser.own_code, [Validators.required]],
      registerNumer: [this.autService.getUser.register, [Validators.required]],
      phoneNumber: [this.autService.getUser.phone, [Validators.required]],
      password: [this.autService.getUser.password, [Validators.required]],
      checkPassword: [this.autService.getUser.password],
      avatar: [this.autService.getUser.avatar]
    });
  }

  change(): void {
    let idx = userList.indexOf(this.text);
    ++idx;
    if (idx === userList.length) {
      idx = 0;
    }
    this.text = userList[idx];
    this.color = colorList[idx];
  }

  submitForm(): void {
    for (const i in this.userForm.controls) {
      this.userForm.controls[i].markAsDirty();
      this.userForm.controls[i].updateValueAndValidity();
    }
    if (this.userForm.invalid) {
      this.notification.create(
        "warning", //error , success, info
        "Анхаар",
        "Шаардлагатай утгуудыг гүйцэт бөглөнө үү"
      );
      return;
    }

    if (
      this.userForm.controls.password.value !=
      this.userForm.controls.checkPassword.value
    ) {
      this.notification.create(
        "warning",
        "Анхаар",
        "Баталгаажуулах нууц үг буруу байна"
      );
      return;
    }

    let obj: any = {
      id: this.autService.getUser._id,
      avatar: this.userForm.controls.avatar.value,
      f_name: this.autService.getUser.f_name,
      l_name: this.autService.getUser.l_name,
      register: this.autService.getUser.password,
      phone: this.userForm.controls.phoneNumber.value,
      password: this.userForm.controls.password.value
    };
    this.autService.update(obj).subscribe(res => {
      if (res) {
        this.notification.create(
          "success",
          "Амжилттай",
          "Хэрэглэгчийн мэдээлэл шинэчлэгдлээ"
        );
      } else {
        this.notification.create(
          "error",
          "Анхаар",
          "Серверт алдаа гарсан байна"
        );
      }
    });
  }
}
