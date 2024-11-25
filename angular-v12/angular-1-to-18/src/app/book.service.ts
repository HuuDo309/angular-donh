import { Injectable } from '@angular/core';
import { Book } from './models/book';
import { fakeBooks } from './books/fake-books';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksURL = "http://localhost:3000/books"
  getBooks(): Observable<Book[]> {
    // this.messageService.add(`${ new Date().toLocaleString()}`)
    // return of(fakeBooks);
    return this.http.get<Book[]>(this.booksURL).pipe(
      tap(receivedBooks => console.log(`receivedBooks = ${JSON.stringify(receivedBooks)}`)),
      catchError(error => of([]))
    )
  } 

  getBookFromId(id: number): Observable<Book> {
    // const book = fakeBooks.find(book => book.id === id);
    // if (book) {
    //   return of(book); 
    // } else {
    //   return of({
    //     id: 0,
    //     name: 'Unknown Book',
    //     author: 'Unknown Author',
    //     releaseYear: 0
    //   });  
    // }
    const url = `${this.booksURL}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(selectedBooks => console.log(`selected Books = ${JSON.stringify(selectedBooks)}`)),
      catchError(error => of(new Book()))
    );
  }

  updateBook(book: Book): Observable<any> {
    return this.http.put(`${this.booksURL}/${book.id}`, book, httpOptions).pipe(
      tap(updatedBook => console.log(`updated book = ${JSON.stringify(updatedBook)}`)),
      catchError(error => of(new Book()))
    );
  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(this.booksURL, newBook, httpOptions).pipe(
      tap((book: Book) => console.log(`inserted book = ${JSON.stringify(book)}`)),
      catchError(error => of(new Book()))
    );
  }

  deleteBook(bookId: number): Observable<Book> {
    const url = `${this.booksURL}/${bookId}`;
    return this.http.delete<Book>(url, httpOptions).pipe(
      tap(_ => console.log(`Deleted book with id ${bookId}`)),
      catchError(error)
    )
  }

  searchBooks(typedString: string): Observable<Book[]> {
    if (!typedString.trim()) {
      return of([]);
    }
    return this.http.get<Book[]>(`${this.booksURL}?name_like=${typedString}`).pipe(
      tap(foundedBook => console.log(`founded movies = ${JSON.stringify(foundedBook)}`)),
      catchError(error)
    )
  }

  constructor(
    public messageService : MessageService,
    private http: HttpClient) {

  }
}
