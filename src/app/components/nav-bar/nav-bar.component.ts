import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  menuOpen = signal(false);

  @Input() isLoggedIn: boolean = false;
  @Output() logout = new EventEmitter<void>();

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }

  onLogout() {
    this.logout.emit();
  }
}
