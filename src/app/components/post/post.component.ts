import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  @Input() post: Post;

  constructor(private router: Router) {}

  configureImagePath(){
    return `http://localhost:8081/${this.post.file[0].path}`
  }

  navToPostDetails(id) {
    this.router.navigateByUrl('/posts/' + id);
  }

}
