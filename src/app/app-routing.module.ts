import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { PostComponent } from "./post/post.component";
import { PostsComponent } from "./posts/posts.component";
import { AuthGuard } from "src/services/auth.guard";
import { CreatePostComponent } from "./create-post/create-post.component";

const routes: Routes = [
  { path: "", redirectTo: "app/posts", pathMatch: "full" },
  {
    path: "app",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/app/posts", pathMatch: "full" },
      { path: "posts", component: PostsComponent },
      { path: "post/:id", component: PostComponent },
      { path: "posts/create", component: CreatePostComponent }
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
