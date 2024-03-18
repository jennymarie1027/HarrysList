import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  imageForm: FormGroup = new FormGroup({
    title: new FormControl('test', [Validators.required]),
    description: new FormControl('test', [Validators.required]),
    image: new FormControl(''),
  });
  imageData;
  images;

  toBase64 = (uInt8Array) => btoa(String.fromCharCode(...uInt8Array));

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.getAllImages();
  }

  getAllImages() {
    this.postService.getImages().subscribe((images) => {
      console.log(images);
      this.images = images;
    });
    // this.postService.getImages().subscribe(
    //   map((data) => console.log('data ===', data))
    // )
  }

  onImageSubmit() {
    this.imageForm.value.image = `data:image/jpeg;base64,${this.toBase64(
      this.imageForm.value.image
    )}`;
    // console.log('this.imageForm.value.image', this.imageForm.value.image);
    this.postService.addImage(this.imageForm.value).subscribe((res) => {
      console.log(res);
    });
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imageForm.patchValue({ image: file });
    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowedFileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file); // converts file for us
    }
  }

  onSubmit(){
    console.log('file selected', event);
    this.imageForm.reset();
    this.imageData = null;

  }
}
