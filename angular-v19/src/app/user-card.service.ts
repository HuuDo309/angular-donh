import { Injectable } from '@angular/core';
import { fakeUserCards } from './user-card/fake-user-card';
import { UserCard } from './models/user-card';

import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserCardService {
  getUserCard(): Observable<UserCard[]>{
    this.messageService.add(`${ new Date().toLocaleString()}`)
    return of(fakeUserCards);
  }

  getUserCardFromId(id: number): Observable<UserCard> {
    const usercard = fakeUserCards.find(usercard => usercard.id === id);
    if (usercard) {
      return of(usercard);
    } else {
      return throwError(() => new Error('UserCard not found'));
    }
  }
  constructor(public messageService: MessageService) { }
}
