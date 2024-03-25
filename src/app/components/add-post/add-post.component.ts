import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/PostService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  addPostForm: FormGroup = new FormGroup({
    title: new FormControl('image test', [Validators.required]),
    description: new FormControl('image test', [Validators.required]),
    file: new FormControl(),
    price: new FormControl('3', [Validators.required]),
    category: new FormControl('test', [Validators.required]),
  });
  selectedFile: File;
  model = {
    title: null,
    description: null,
    price: null,
    category: null
  }

  constructor(private postService: PostService, private router: Router) {}

  onFileSelected(event): void {
    this.selectedFile = <File>event.target.files[0];
    this.addPostForm.patchValue({
      file: this.selectedFile,
    });
  }

  // onSubmit(): void {
  //   console.log('this.addPost.value =', this.addPostForm.value);
  //   this.postService.createPost(this.addPostForm.value).subscribe();
  //   // this.router.navigateByUrl('/posts');
  // }

  onSubmit(): void {
    let formData: FormData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('authorId', localStorage.getItem('author_id'));
    Object.keys(this.model).forEach((key) => {
      formData.append(key, this.model[key]);
    });
    this.postService.createPost(formData).subscribe(res => console.log('createPostRes = ', res));
  }

  checkControlForError(name) {
    return (
      this.addPostForm.get(name).errors && this.addPostForm.get(name).touched
    );
  }
}
