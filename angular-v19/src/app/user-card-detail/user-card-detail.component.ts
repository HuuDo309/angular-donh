import { Component, Input } from '@angular/core';
import { UserCard } from '../models/user-card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserCardService } from '../user-card.service';

@Component({
  selector: 'app-user-card-detail',
  imports: [
    FormsModule,
    CommonModule,
    ],
  templateUrl: './user-card-detail.component.html',
  styleUrl: './user-card-detail.component.css'
})
export class UserCardDetailComponent {
  @Input() usercard!: UserCard

  constructor(
    private route: ActivatedRoute,
    private userCardService: UserCardService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getUserCardFromRoute();
  }

  getUserCardFromRoute(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    const id = idString && !isNaN(Number(idString)) ? Number(idString) : null;

    if (id !== null) {
      this.userCardService.getUserCardFromId(id).subscribe(usercard => {
        this.usercard = usercard;
      });
    } else {
      console.error('Invalid or missing id in the route.');
    }
  }
  goBack(): void {
    this.location.back();
  }
}
