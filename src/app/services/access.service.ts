import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AccessService {
  readonly unlocked = signal(false);

  async check(value: string): Promise<boolean> {
    const bytes = new TextEncoder().encode(value.trim());
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
    const ok = hash === environment.appPasswordSha256;
    if (ok) {
      this.unlocked.set(true);
    }
    return ok;
  }

  lock(): void {
    this.unlocked.set(false);
  }
}
