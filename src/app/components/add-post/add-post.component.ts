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
    title: new FormControl('error test', [Validators.required]),
    description: new FormControl('error test', [Validators.required]),
    file: new FormControl(),
    price: new FormControl('3444', [Validators.required]),
    category: new FormControl('error test', [Validators.required]),
  });
  selectedFile: File;
  formData: FormData = new FormData();
  fileList: File[] = [];

  constructor(private postService: PostService, private router: Router) {}

  onFileSelected(event): void {
    this.selectedFile = <File>event.target.files[0];
    this.fileList.push(this.selectedFile);
  }

  formatFormData() {
    this.formData.append('authorId', localStorage.getItem('author_id'));
    this.fileList.forEach((fileInList) => {
      this.formData.append("file", fileInList)
    })
    Object.keys(this.addPostForm.value).forEach((key) => {
      this.formData.append(key, this.addPostForm.value[key]);
    });
  }

  onSubmit(): void {
    this.formatFormData();
    this.postService.createPost(this.formData).subscribe({
      next: () => {
        this.router.navigateByUrl('/posts');
      },
      error: (err) => {
        console.log('error creating post: ', err);
        if (!err.status) {
          this.addPostForm.setErrors({ noConnection: true });
        } else {
          this.addPostForm.setErrors({ createPostError: true });
        }
      },
    });
  }

  checkControlForError(name) {
    return (
      this.addPostForm.get(name).errors && this.addPostForm.get(name).touched
    );
  }
}
