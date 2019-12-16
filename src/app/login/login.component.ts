import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AuthService } from "src/services/auth.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = false;
  warn = false;
  showPassword = false;
  // appname = config.APP_NAME;
  appname = "Нэвтрэх";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ])
    });
    this.loginForm.reset();
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.warn = true;
      this.error = false;
      return;
    }

    console.log("login");
    console.log(this.f.username.value, this.f.password.value);
    this.loading = true;
    this.auth
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(data => {
        if (data === null) {
          this.loading = false;
          this.warn = false;
          this.error = true;
        } else {
          this.router.navigate([""]);
        }
      });
  }
}
