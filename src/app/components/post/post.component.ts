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
  placeholder =
    'https://images.unsplash.com/photo-1536566482680-fca31930a0bd?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  constructor(private router: Router) {}

  navToPostDetails(id) {
    this.router.navigateByUrl('/posts/' + id);
  }

  formatImageSrc(filepath: string){
    console.log(`http://localhost:8081/${filepath}`)
    return `http://localhost:8081/${filepath}.png`
  }
}
