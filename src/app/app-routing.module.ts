import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { PostComponent } from "./post/post.component";
import { PostsComponent } from "./posts/posts.component";

const routes: Routes = [
  { path: "", redirectTo: "app/posts", pathMatch: "full" },
  {
    path: "app",
    component: HomeComponent,
    children: [
      { path: "", redirectTo: "/app/posts", pathMatch: "full" },
      { path: "posts", component: PostsComponent },
      { path: "post", component: PostComponent }
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
