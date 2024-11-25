import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Blog } from './models/blogs';
import { error } from '@angular/compiler/src/util';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private blogsUrl = 'http://localhost:3000/blogs'; 

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.blogsUrl); 
  }

  searchBlogs(typedString: string): Observable<Blog[]> {
    if (!typedString.trim()) {
      return of([]);
    }
    return this.http.get<Blog[]>(`${this.blogsUrl}?title_like=${typedString}`).pipe(
      tap(foundedBlog => console.log(`founded blogs = ${JSON.stringify(foundedBlog)}`)),
      catchError(error)
    )
  }

  deleteBlog(blogId: number): Observable<Blog> {
    const url = `${this.blogsUrl}/${blogId}`;
    return this.http.delete<Blog>(url, httpOptions).pipe(

    )
  }
}
