import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AccessService {
  // Change this before sharing the link.
  private readonly password = 'Reddy@849';
  readonly unlocked = signal(sessionStorage.getItem('baggie-unlocked') === 'yes');

  check(value: string): boolean {
    const ok = value.trim() === this.password;
    if (ok) {
      sessionStorage.setItem('baggie-unlocked', 'yes');
      this.unlocked.set(true);
    }
    return ok;
  }

  lock(): void {
    sessionStorage.removeItem('baggie-unlocked');
    this.unlocked.set(false);
  }
}
