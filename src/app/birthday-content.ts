import { Component, computed, HostListener, signal, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-birthday-content',
  standalone: true,
  templateUrl: './birthday-content.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.None
})
export class BirthdayContent {
   elapsedSeconds = signal(0);
  isScrolled = signal(false);
  @HostListener('window:scroll')
onWindowScroll(): void {
  this.isScrolled.set(window.scrollY > 120);
}
  private timerId?: ReturnType<typeof setInterval>;

  private readonly birthdayDate =
    new Date(2000, 9, 20, 0, 0, 0).getTime();

  // Derived values automatically update when elapsedSeconds changes.
  timerDays = computed(() =>
    Math.floor(this.elapsedSeconds() / 86400)
  );

  timerHours = computed(() =>
    String(
      Math.floor((this.elapsedSeconds() % 86400) / 3600)
    ).padStart(2, '0')
  );

  timerMinutes = computed(() =>
    String(
      Math.floor((this.elapsedSeconds() % 3600) / 60)
    ).padStart(2, '0')
  );

  timerSeconds = computed(() =>
    String(this.elapsedSeconds() % 60).padStart(2, '0')
  );

  constructor() {
    this.updateTimer();

    this.timerId = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  private updateTimer(): void {
    this.elapsedSeconds.set(
      Math.max(
        0,
        Math.floor((Date.now() - this.birthdayDate) / 1000)
      )
    );
  }

  start(): void {
    document.getElementById('birthday')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  replay(): void {
    document.getElementById('intro')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}
