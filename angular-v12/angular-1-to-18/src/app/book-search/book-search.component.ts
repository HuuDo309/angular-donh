import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged,switchMap } from 'rxjs/operators';

import { Book } from '../models/book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
  books$?: Observable<Book[]>;
  private searchedSubject = new Subject<string>();

  constructor(private bookService: BookService) { }

  search(searchedString: string): void {    
    console.log(`searchedString = ${searchedString}`);
    this.searchedSubject.next(searchedString);
  }

  ngOnInit(): void {
    this.books$ = this.searchedSubject.pipe(
      debounceTime(300), 
      distinctUntilChanged(),
      switchMap((searchedString: string) => this.bookService.searchBooks(searchedString))
    );
  }
}
