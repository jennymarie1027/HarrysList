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
    title: new FormControl('test', [Validators.required]),
    description: new FormControl('test', [Validators.required]),
    image: new FormControl(''),
    price: new FormControl('3', [Validators.required]),
    category: new FormControl('test', [Validators.required]),
  });
  imageData: string;

  constructor(private postService: PostService, private router: Router) {}

  onAddPostSubmit() {
    console.log(this.addPostForm.value);
    this.postService.createPost(this.addPostForm.value).subscribe((res) => {
      console.log('createPost res =', res)
    });
    // this.router.navigateByUrl('/posts');
  }

  checkControlForError(name) {
    return (
      this.addPostForm.get(name).errors && this.addPostForm.get(name).touched
    );
  }

  // choosing the first & only image & setting the particular image to the file type
  // we are then patching that value, only allowing png & jpeg types
  // read that file in, once its loaded set local variable imageData to the reader result as a string
  // then we use the reader to read the data url for our uploaded file
  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addPostForm.patchValue({ image: file });
    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowedFileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file); // converts file for us
    }
  }
}
