import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  addPostForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl(''),
  });

  constructor(private postService: PostService, private router: Router) {}

  onAddPostSubmit() {
    this.postService.createPost(this.addPostForm.value).subscribe();
    this.router.navigateByUrl('/posts');
  }

  checkControlForError(name){
    return this.addPostForm.get(name).errors && this.addPostForm.get(name).touched
  }
}
