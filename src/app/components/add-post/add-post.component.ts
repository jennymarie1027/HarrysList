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
    title: new FormControl('image test', [Validators.required]),
    description: new FormControl('image test', [Validators.required]),
    file: new FormControl(),
    price: new FormControl('3', [Validators.required]),
    category: new FormControl('test', [Validators.required]),
  });
  selectedFile: File;

  constructor(private postService: PostService, private router: Router) {}

  onFileSelected(event): void {
    this.selectedFile = <File>event.target.files[0];
    console.log('selected file: ', this.selectedFile);
    this.addPostForm.patchValue({
      file: this.selectedFile,
    });
  }

  onSubmit(): void {
    console.log('this.addPost.value =', this.addPostForm.value)
    this.postService.createPost(this.addPostForm.value).subscribe();
    // this.router.navigateByUrl('/posts');
  }

  checkControlForError(name) {
    return (
      this.addPostForm.get(name).errors && this.addPostForm.get(name).touched
    );
  }
}
