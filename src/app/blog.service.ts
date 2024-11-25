import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Blog } from './models/blogs';

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

  getBlogFromId(id: number): Observable<Blog> {
    const url = `${this.blogsUrl}/${id}`;
    return this.http.get<Blog>(url).pipe(
      tap(selectedBlog => console.log(`selected Blog = ${JSON.stringify(selectedBlog)}`))
    )
  }

  editBlog(blog: Blog): Observable<any> {
    return this.http.put(`${this.blogsUrl}/${blog.id}`, blog, httpOptions).pipe(
      tap(editedBlog => console.log(`edited blog = ${JSON.stringify(editedBlog)}`))
    )
  }

  addBlog(newBlog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.blogsUrl, newBlog, httpOptions).pipe(
      tap((blog: Blog) => console.log(`inserted blog = ${JSON.stringify(blog)}`))
    )
  }
 
  searchBlogs(typedString: string): Observable<Blog[]> {
    if (!typedString.trim()) {
      return of([]);
    }
    return this.http.get<Blog[]>(`${this.blogsUrl}?title_like=${typedString}`).pipe(
      tap(foundedBlog => console.log(`founded blogs = ${JSON.stringify(foundedBlog)}`)),
    )
  }

  deleteBlog(blogId: number): Observable<Blog> {
    const url = `${this.blogsUrl}/${blogId}`;
    return this.http.delete<Blog>(url, httpOptions).pipe(
      tap(_ => console.log(`Deleted book with id ${blogId}`))
    )
  }
}
