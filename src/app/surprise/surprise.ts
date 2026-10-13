import { Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccessService } from '../services/access.service';

@Component({
  selector: 'app-surprise',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './surprise.html',
  styleUrl: '../app.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SurpriseComponent {
  /** Set true temporarily to preview the birthday letter before the date. */
  readonly forceBirthdayMessageForTesting = false;
  readonly accessService = inject(AccessService);
  readonly birthdayMessageIsAvailable =
    this.forceBirthdayMessageForTesting || this.accessService.surpriseUnlockBeforeDate() || Date.now() >= new Date(2026, 9, 20).getTime();
}
