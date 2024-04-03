import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/PostService';
import { Post } from 'src/models/Post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent {
  post: undefined | Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.postService.getPost(id).subscribe((post: Post) => {
      this.post = post
      console.log(this.post)
    });
  }

  isOwner() {
    if (this.post) {
      return localStorage.getItem('user_id') === this.post.authorId;
    }
    return false;
  }

  onDeletePost(id) {
    this.postService.deletePost(id).subscribe();
    this.router.navigateByUrl('/posts');
  }

  navToPostEdit(id) {
    this.router.navigateByUrl('/edit-post/' + id);
  }

  configureImagePath(path){
    return `http://localhost:8081/${path}`
  }
}
