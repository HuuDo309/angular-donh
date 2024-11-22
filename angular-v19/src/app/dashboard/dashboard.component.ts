import { Component } from '@angular/core';
import { UserCard } from '../models/user-card';
import { UserCardService } from '../user-card.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  usercards: UserCard[] = [];

  constructor(private usercardService: UserCardService) {}

  ngOnInit() {
    this.getUserCards();
  }
  
  getUserCards(): void {
    this.usercardService.getUserCard().subscribe(usercards => this.usercards = usercards.slice(1,5))
  }
}
