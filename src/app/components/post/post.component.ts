import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/PostService';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  @Input() post: Post;
  fileListLength: number;
  currentIndex: number = 0;
  datePostCreated: number;

  constructor(
    private router: Router,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.fileListLength = this.post.file.length;
    this.configureDate();
  }

  configureImagePath() {
    return `http://localhost:8081/${this.post.file[this.currentIndex].path}`;
  }

  navToPostDetails(id) {
    this.router.navigateByUrl('/posts/' + id);
  }

  updateImagePath() {
    if (this.currentIndex < this.fileListLength - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  configureDate() {
    let d: Date = new Date(this.post.postCreated);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear().toString();
    return `${month}/${day}/${year.slice(2)}`;
  }

  addToFaves() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.postService
        .addFave(userId, this.post._id)
        .subscribe((res) => console.log('addFave res - ', res));
    }
  }
}
