import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { AuthGuardService } from '../../services/authentication/auth-guard.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  query = signal('');
  users = signal<User[]>([]);
  error = signal<string | null>(null);
  isLoaded = signal(false);

  private usersService = inject(UsersService);
  private authGuardService = inject(AuthGuardService);

  constructor() {
    this.loadUsers();
  }

  loadUsers() {
    if (!this.authGuardService.isAuthenticated()) return;

    this.usersService.getAllUsers().subscribe({
      next: (response) => {
        this.users.set(response);
        console.log(this.users);
        this.query.set('');
        this.isLoaded.set(true);

        response.forEach((user) => {
          if (user.image) {
            console.log('User image:', user.image);
          }
        });
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
