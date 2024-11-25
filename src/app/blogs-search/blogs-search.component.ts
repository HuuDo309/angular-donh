import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged,switchMap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

import { Blog } from '../models/blogs';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blogs-search',
  templateUrl: './blogs-search.component.html',
  styleUrls: ['./blogs-search.component.css']
})
export class BlogsSearchComponent implements OnInit {
  blogs$?: Observable<Blog[]>;
  private searchedSubject = new Subject<string>();
  constructor(private blogService: BlogService) { }

  search(searchedString: string): void {
    console.log(`searchedString = ${searchedString}`);
    this.searchedSubject.next(searchedString);
  }

  ngOnInit(): void {
    this.blogs$ = this.searchedSubject.pipe(
      debounceTime(300), 
      distinctUntilChanged(),
      switchMap((searchedString: string) => this.blogService.searchBlogs(searchedString))
    )
  }
}
