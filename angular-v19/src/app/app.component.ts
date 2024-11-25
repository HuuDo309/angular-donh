import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserCardService } from './user-card.service';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
],
  providers: [
    UserCardService,
    MessageService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular Project';
}
