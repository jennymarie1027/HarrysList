import { Component } from '@angular/core';
import { PostService } from 'src/app/services/PostService';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/models/Post';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  email = '';
  faveoriteList: any;
  favorites: any = [];
  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.getUserEmail();
    this.getListOfFaves();
    this.getListOfFaves();
  }

  getUserEmail() {
    this.authService.email$.subscribe((email) => (this.email = email));
  }

  getListOfFaves() {
    const userId = localStorage.getItem('user_id');
    this.postService
      .getFaves(userId)
      .subscribe((res) => {
        this.favorites = res
        console.log('faves res = ', res)
      });
  }
}
