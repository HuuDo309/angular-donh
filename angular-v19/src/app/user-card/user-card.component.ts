import { Component } from '@angular/core';
import { UserCard } from '../models/user-card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { fakeUserCards } from './fake-user-card';
// import { UserCardDetailComponent } from "../user-card-detail/user-card-detail.component";
import { UserCardService } from '../user-card.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // UserCardDetailComponent,
    RouterModule
],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  // usercard: UserCard;
  usercards: UserCard[] = [];

  constructor (private userCardService: UserCardService) {}

  getUserCardFromService(): void {
    // this.usercards = this.userCardService.getUserCard();
    this.userCardService.getUserCard().subscribe(updatedCards => this.usercards = updatedCards)
  }

  ngOnInit() {
    this.getUserCardFromService();
  }
  // selectedUserCard!: UserCard;
  // onSelect(usercard: UserCard): void {
  //   this.selectedUserCard= usercard;
  //   console.log(`selectedUserCard = ${JSON.stringify(this.selectedUserCard)}`);
  // }
}
