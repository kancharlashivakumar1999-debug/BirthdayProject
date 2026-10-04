import { Component, inject, signal } from '@angular/core';
import { AccessService } from './services/access.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly password = signal('');
  readonly wrongPassword = signal(false);
  readonly showPassword = signal(false);
  readonly showAudio = signal(false);
private readonly accessService = inject(AccessService);

readonly access = this.accessService.unlocked;

  constructor() {}

  unlock(): void {
    const ok = this.accessService.check(this.password());
    this.wrongPassword.set(!ok);
    if (ok) {
      setTimeout(() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' }), 250);
    }
  }

  setPassword(value: string): void {
    this.password.set(value);
    this.wrongPassword.set(false);
  }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  start(): void {
    document.getElementById('birthday')?.scrollIntoView({ behavior: 'smooth' });
  }

  replay(): void {
    document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' });
  }
}
