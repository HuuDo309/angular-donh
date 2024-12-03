import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Blog } from './models/blogs';
import { MappingService } from './mapping.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private blogsUrl = 'http://localhost:3000/blogs'; 
  private blogs: Blog[] = [];

  constructor(
    private mappingService: MappingService,
    private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.blogsUrl).pipe(
      tap(blogs => {
        this.blogs = blogs;
      })
    );
  }

  getAllBlogIds(): Observable<number[]> {
    return this.http.get<{ id: number }[]>(`${this.blogsUrl}`).pipe(
      map(blogs => blogs.map(blog => blog.id))
    );
  }
  
  getBlogFromId(id: number): Observable<Blog> {
    const url = `${this.blogsUrl}/${id}`;
    return this.http.get<Blog>(url).pipe(
      tap(selectedBlog => console.log(`selected Blog = ${JSON.stringify(selectedBlog)}`)),
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
    const filteredBlogs = this.blogs.filter(blog =>
      blog.title.toLowerCase().trim().includes(typedString.toLowerCase()) ||  
      (this.mappingService.categoryMap.get(blog.category)?.toLowerCase().trim().includes(typedString.toLowerCase())) ||  
      (this.mappingService.publicMap.get(blog.public)?.toLowerCase().trim().includes(typedString.toLowerCase())) ||  
      blog.position.some(pos => this.mappingService.positionMap.get(pos)?.toLowerCase().trim().includes(typedString.toLowerCase()))  
    );
    

    return of(filteredBlogs);
  }

  deleteBlog(blogId: number): Observable<Blog> {
    const url = `${this.blogsUrl}/${blogId}`;
    return this.http.delete<Blog>(url, httpOptions).pipe(
      tap(_ => console.log(`Deleted blog with id ${blogId}`))
    )
  }
}
