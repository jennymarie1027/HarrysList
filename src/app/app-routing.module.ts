import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MessagesComponent } from './components/messages/messages.component';
import { PostsComponent } from './components/posts/posts.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'myposts', component: MyPostsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'add-post', component: AddPostComponent },
  { path: 'edit-post/:id', component: PostEditComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
