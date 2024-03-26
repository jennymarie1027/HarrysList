import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Post } from '../../models/Post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  API_URL = 'http://localhost:8081';
  posts$: BehaviorSubject<Post[]> = new BehaviorSubject([]);
  images$: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  createPost(postDetails): Observable<any> {
    return this.http.post(`${this.API_URL}/posts`, postDetails); 
  }

  getAllPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.API_URL}/posts`, )
      .pipe(tap((p) => this.posts$.next(p)));
  }

  getPost(id): Observable<Post> {
    return this.http.get<Post>(`${this.API_URL}/post/${id}`);
  }

  getMyPosts(): Observable<Post[]> {
    let authorId = localStorage.getItem('author_id');
    return this.http.get<Post[]>(`${this.API_URL}/myposts/${authorId}`);
  }

  deletePost(id) {
    return this.http.delete(`${this.API_URL}/post/${id}`);
  }

  editPost(id, values) {
    return this.http.put(`${this.API_URL}/post/${id}`, values);
  }

}
