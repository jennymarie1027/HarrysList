import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/models/Post';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
})
export class PostEditComponent {
  post: Post | undefined;

  editPostForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.postService.getPost(id).subscribe((post: Post) => {
      this.post = post;
      this.fillOutForm();
    });
  }

  onEditPostSubmit() {
    const { id } = this.route.snapshot.params;
    if(id){
      this.postService.editPost(id, this.editPostForm.value).subscribe();
      this.router.navigateByUrl('/posts');
    }
  }

  fillOutForm() {
    this.editPostForm.patchValue({
      title: this.post.title,
      price: this.post.price,
      category: this.post.category,
      description: this.post.description,
      image: this.post.image,
    });
  }
}
