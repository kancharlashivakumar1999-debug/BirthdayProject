import { Component, inject, signal, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { AccessService } from './services/access.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly password = signal('');
  readonly wrongPassword = signal(false);
  readonly showPassword = signal(false);
  readonly contentComponent = signal<Type<unknown> | null>(null);
  private readonly accessService = inject(AccessService);

  constructor() {}

  async unlock(): Promise<void> {
    try {
      const ok = await this.accessService.check(this.password());
      this.wrongPassword.set(!ok);
      if (ok) {
        const { BirthdayContent } = await import('./birthday-content');
        this.contentComponent.set(BirthdayContent);
        setTimeout(() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' }), 250);
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
    this.showPassword.update(v => !v);
  }

  start(): void {
    document.getElementById('birthday')?.scrollIntoView({ behavior: 'smooth' });
  }

  replay(): void {
    document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' });
  }
}
