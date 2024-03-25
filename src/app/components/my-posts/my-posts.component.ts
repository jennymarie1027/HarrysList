import { Component } from '@angular/core';
import { PostService } from 'src/app/services/PostService';
import { Post } from 'src/models/Post';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css'],
})
export class MyPostsComponent {
  posts: Post[];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getMyPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  navToProductDetails(id) {
    this.router.navigateByUrl('/posts/' + id);
  }
}
