// import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, tap, map } from 'rxjs';
// import { Post } from '../../models/Post';

// @Injectable({
//   providedIn: 'root',
// })
// export class PostService {
//   API_URL = 'http://localhost:8081';
//   posts$: BehaviorSubject<Post[]> = new BehaviorSubject([]);
//   images$: BehaviorSubject<any> = new BehaviorSubject([]);

//   constructor(private http: HttpClient) {}

//   createPost(postDetails): Observable<any> {
//     postDetails.authorId = localStorage.getItem('user_id');
//     // const headers = new HttpHeaders({
//     //   'Content-Type': 'multipart/form-data',
//     // });
//     return this.http.post(`${this.API_URL}/posts`, postDetails); // 
//   }

//   getAllPosts(): Observable<Post[]> {
//     return this.http
//       .get<Post[]>(`${this.API_URL}/posts`)
//       .pipe(tap((p) => this.posts$.next(p)));
//   }

//   getPost(id): Observable<Post> {
//     return this.http.get<Post>(`${this.API_URL}/post/${id}`);
//   }

//   getMyPosts(): Observable<Post[]> {
//     let authorId = localStorage.getItem('user_id');
//     return this.http.get<Post[]>(`${this.API_URL}/myposts/${authorId}`);
//   }

//   deletePost(id) {
//     return this.http.delete(`${this.API_URL}/post/${id}`);
//   }

//   editPost(id, values) {
//     return this.http.put(`${this.API_URL}/post/${id}`, values);
//   }

//   // addImage(values) {
//   //   return this.http.post<any>(`${this.API_URL}/images`, values);
//   // }

//   addImage(name: string, image: File): Observable<any> {
//     const imageData = new FormData();
//     imageData.append('name', name);
//     imageData.append('image', image, name);
//     return this.http.post(`${this.API_URL}/images`, imageData).pipe(
//       tap(() => {
//         const image: any = {
//           name: name,
//           // image: imageData.imagePath
//         };
//         // this.images.push(image)
//         this.images$.next(image);
//       })
//       // , tap(() => this.images$.next(image))
//     );
//   }

//   getImages() {
//     return this.http.get(`${this.API_URL}/images`);
//   }
// }
