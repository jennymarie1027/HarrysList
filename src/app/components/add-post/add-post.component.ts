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
  generalError: boolean = false
  
  constructor(private postService: PostService, private router: Router) {}

  onFileSelected(event): void {
    this.selectedFile = <File>event.target.files[0];
  }

  formatFormData(){
    this.formData.append('file', this.selectedFile);
    this.formData.append('authorId', localStorage.getItem('author_id'));
    Object.keys(this.addPostForm.value).forEach((key) => {
      this.formData.append(key, this.addPostForm.value[key]);
    });
  }

  onSubmit(): void {
    try {
      this.formatFormData()
      this.postService.createPost(this.formData).subscribe();
      this.router.navigateByUrl('/posts')
    } catch (error) {
      this.generalError = true
      console.log('error from adding post = ', error)
    }

  }

  checkControlForError(name) {
    return (
      this.addPostForm.get(name).errors && this.addPostForm.get(name).touched
    );
  }
}
