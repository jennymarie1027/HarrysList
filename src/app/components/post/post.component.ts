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
  fileListLength: number;
  currentIndex: number = 0
  datePostCreated: number;

  constructor(private router: Router) {}

  ngOnInit(){
    this.fileListLength = this.post.file.length
    this.configureDate()
  }

  configureImagePath(){
    return `http://localhost:8081/${this.post.file[this.currentIndex].path}`
  }

  navToPostDetails(id) {
    this.router.navigateByUrl('/posts/' + id);
  }

  updateImagePath(){
    if(this.currentIndex < this.fileListLength - 1) {
      this.currentIndex++
    } else {
      this.currentIndex = 0
    }
  }

  configureDate(){
    let d: Date = new Date(this.post.postCreated)
    const month = d.getMonth()
    const day =  d.getDate()
    const year =  d.getFullYear().toString()
    console.log(`posted ${month}/${day}/${year.slice(2)}`)
    return `${month}/${day}/${year.slice(2)}`
  }
}
