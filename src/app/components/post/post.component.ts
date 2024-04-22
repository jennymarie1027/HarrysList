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
  signedin = false;
  favoritesList: any;
  isFavorite: boolean = false;

  constructor(
    private router: Router,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.fileListLength = this.post.file.length;
    this.configureDate();
    //
    this.authService.signedin$.subscribe(
      (signedin) => (this.signedin = signedin)
    );
    this.signedin = this.authService.isLoggedIn();
    this.checkIfFave();
  }

  ngOnChanges(){
    console.log('change')
    this.checkIfFave()
  }

  configureImagePath() {
    return `http://localhost:8081/${this.post.file[this.currentIndex].path}`;
  }

  navToPostDetails(id) {
    this.router.navigateByUrl('/posts/' + id);
  }

  updateImagePath(direction) {
    if(direction === 'forward') {
      this.currentIndex < this.fileListLength - 1 ? this.currentIndex++ : this.currentIndex = 0;
    }
    if(direction === 'back') {
      this.currentIndex === 0 ?  this.currentIndex = this.fileListLength - 1 : this.currentIndex--;
    }
  }

  configureDate() {
    let d: Date = new Date(this.post.postCreated);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear().toString();
    return `${month}/${day}/${year.slice(2)}`;
  }

  addToFave() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.postService
        .addFave(userId, this.post._id)
        .subscribe((res) => console.log('addFave res - ', res));
    }
    this.post.isFave = true
  }

  removeFromFaves() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.postService
        .removeFave(userId, this.post._id)
        .subscribe((res) => console.log('removeFave res = ', res));
    }
    this.post.isFave = false
  }

  // maybe a toast notification to confirm post added to favorites
  checkIfFave() {
    if (this.signedin) {
      const userId = localStorage.getItem('user_id');
      this.postService.getFaves(userId).subscribe((res) => {
        this.favoritesList = res;
        this.favoritesList.forEach((post) => {
          if (post && post._id === this.post._id) {
            this.isFavorite = true;
          }
        });
      });
    }
  }
}
