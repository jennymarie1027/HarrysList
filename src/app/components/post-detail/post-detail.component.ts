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
  placeholder =
    'https://images.unsplash.com/photo-1612178537253-bccd437b730e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.postService.getPost(id).subscribe((post: Post) => (this.post = post));
  }

  isOwner() {
    if (this.post) {
      return localStorage.getItem('author_id') === this.post.authorId;
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
}
