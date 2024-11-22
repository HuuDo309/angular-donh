import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../models/book';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() book?: Book;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getBookFromRoute();
  }

  getBookFromRoute(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    const id = idString && !isNaN(Number(idString)) ? Number(idString) : null;
    if (id !== null) {
      this.bookService.getBookFromId(id).subscribe(book => {
        this.book = book;
      });
    } else {
      console.error('Invalid or missing id in the route.');
    }
  }

  save(): void {
    this.bookService.updateBook(this.book!).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
