import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../book.service';
// import { fakeBooks } from './fake-books';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books?: Book[];
  constructor( private bookService: BookService) { 

  }

  getBooksFromServices(): void {
    // this.books = this.bookService.getBooks();
    this.bookService.getBooks().subscribe(updatedBooks => this.books = updatedBooks)
  }
  
  ngOnInit(): void {
    this.getBooksFromServices();
  }

  add(name: string, author: string, releaseYear: string): void {
    name = name.trim();
    author = author.trim();
    if (Number.isNaN(Number(releaseYear)) || !name || !author || Number(releaseYear) === 0) {
      alert('Name and author must not be blank, release year must be a number');
      return;
    }
    const newBook: Book = new Book();
    newBook.name = name;
    newBook.author = author;
    newBook.releaseYear = Number(releaseYear);
    this.bookService.addBook(newBook)
        .subscribe(insertedBook => {
          this.books?.push(insertedBook);
        })
  }

  delete(bookId: number): void {
    this.bookService.deleteBook(bookId).subscribe(_ => {
      this.books = this.books?.filter(eachBook => eachBook.id !== bookId);
    })
  }
}
