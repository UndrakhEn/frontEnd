import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgZorroAntdModule, NZ_I18N, en_US, mn_MN } from "ng-zorro-antd";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import mn from "@angular/common/locales/mn";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { PostComponent } from "./post/post.component";
import { PostsComponent } from "./posts/posts.component";
import { CreatePostComponent } from "./create-post/create-post.component";
import { PrivateInformationComponent } from "./private-information/private-information.component";
import { NotificationComponent } from "./notification/notification.component";
import { StatisticComponent } from "./statistic/statistic.component";

registerLocaleData(mn);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PostComponent,
    PostsComponent,
    CreatePostComponent,
    PrivateInformationComponent,
    NotificationComponent,
    StatisticComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: mn_MN }],
  bootstrap: [AppComponent]
})
export class AppModule {}
