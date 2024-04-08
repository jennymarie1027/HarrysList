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
  favorites$: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  createPost(postDetails): Observable<any> {
    try {
      return this.http.post(`${this.API_URL}/posts`, postDetails);
    } catch (error) {
      console.log('createPost error = ', error);
      return error;
    }
  }

  getAllPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.API_URL}/posts`)
      .pipe(tap((p) => this.posts$.next(p)));
  }

  getPost(id): Observable<Post> {
    return this.http.get<Post>(`${this.API_URL}/post/${id}`);
  }

  getMyPosts(): Observable<Post[]> {
    let user_id = localStorage.getItem('user_id');
    return this.http.get<Post[]>(`${this.API_URL}/myposts/${user_id}`);
  }

  deletePost(id) {
    return this.http.delete(`${this.API_URL}/post/${id}`);
  }

  editPost(id, values) {
    return this.http.put(`${this.API_URL}/post/${id}`, values);
  }

  ///// favorites work below //////////////

  addFave(userId, postId) {
    return this.http.post(`${this.API_URL}/myfavorites`, {postId, userId});
  }

  removeFave(userId, postId) {
    return this.http.delete(`${this.API_URL}/myfavorites/${postId}/${userId}`); // , userId
  }

  getFaves(userId) {
    return this.http.get(`${this.API_URL}/myfavorites/${userId}`)
  }
}
