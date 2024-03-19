import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

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

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getAllImages();
  }

  getAllImages() {
    this.postService.getImages().subscribe((images) => {
      this.images = images;
    });
  }

  onImageSubmit() {
    this.postService
      .addImage(this.imageForm.value.name, this.imageForm.value.image)
      .subscribe((res) => {
        console.log('from addImage service', res);
      });
    this.imageForm.reset();
    this.imageData = null;
  }

  // choosing the first & only image & setting the particular image to the file type
  // we are then patching that value, only allowing png & jpeg types
  // read that file in, once its loaded set local variable imageData to the reader result as a string
  // then we use the reader to read the data url for our uploaded file
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
}
