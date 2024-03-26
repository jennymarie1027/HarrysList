import { Component } from '@angular/core';
import { PostService } from 'src/app/services/PostService';
import { Post } from 'src/models/Post';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  posts: Post[];
  noPostMessage;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getAllPosts().subscribe((posts) => {
      this.posts = posts;
      console.log('posts = ', posts)
    });
  }

  navToProductDetails(id) {
    this.router.navigateByUrl('/posts/' + id);
  }
}
