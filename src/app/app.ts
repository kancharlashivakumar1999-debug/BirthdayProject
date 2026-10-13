import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject as injectAnalytics } from '@vercel/analytics';
import { AccessService } from './services/access.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly password = signal('');
  readonly wrongPassword = signal(false);
  readonly showPassword = signal(false);
  readonly accessService = inject(AccessService);

  constructor() {
    if (typeof window !== 'undefined') {
      injectAnalytics();
    }
  }
unlockSurprise(){
    this.accessService.unlockSurprise();
}
  async unlock(): Promise<void> {
    try {
      const ok = await this.accessService.check(this.password());
      this.wrongPassword.set(!ok);
      if (ok) {
        setTimeout(
          () => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' }),
          250,
        );
      }
    } catch {
      this.wrongPassword.set(true);
    }
  }

  setPassword(value: string): void {
    this.password.set(value);
    this.wrongPassword.set(false);
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

}
