import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-birthday-content',
  standalone: true,
  templateUrl: './birthday-content.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.None
})
export class BirthdayContent {
  start(): void {
    document.getElementById('birthday')?.scrollIntoView({ behavior: 'smooth' });
  }

  replay(): void {
    document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' });
  }
}
