import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { User } from '../../interfaces/interfaces';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  private usersService = inject(UsersService);
  private cookieService = inject(CookieService);

  query = signal('');
  users = signal<User[]>([]);
  error = signal<string | null>(null);
  isLoaded = signal(false);
  isLoggedIn = !!this.cookieService.get('token');

  constructor() {
    this.isLoggedIn = this.cookieService.check('token');
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getAllUsers().subscribe({
      next: (response) => {
        this.users.set(response);
        this.query.set('');
        this.isLoaded.set(true);
      },
      error: () => {
        this.error.set('Failed to load users.');
        this.isLoaded.set(true);
      },
    });
  }

  setQuery(query: string) {
    this.query.set(query);
  }

  getImageUrl(imagePath?: string): string {
    if (!imagePath) {
      return 'https://via.placeholder.com/150';
    }
    return `https://react-bank-project.eapi.joincoded.com/${imagePath}`;
  }

  get filteredUsers() {
    return this.users().filter((user) =>
      user.username?.toLowerCase().includes(this.query().toLowerCase())
    );
  }
}
