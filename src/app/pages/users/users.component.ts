import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { User } from '../../interfaces/interfaces';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';
import { UserCardSkeletonComponent } from '../../components/skeletons/user-card-skeleton/user-card-skeleton.component';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, UserCardSkeletonComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  private usersService = inject(UsersService);
  private cookieService = inject(CookieService);
  private router = inject(Router);
  private modalService = inject(ModalService);

  query = signal('');
  users = signal<User[]>([]);
  error = signal<string | null>(null);
  loading = signal(true);
  isLoggedIn = !!this.cookieService.get('token');
  currentUsername = signal<string | null>(null);

  skeletonCount = Array.from({ length: 20 }, (_, i) => i + 1);

  constructor() {
    this.isLoggedIn = this.cookieService.check('token');
    this.loadUsers();
    this.loadCurrentUser();

    effect(() => {
      const refreshCount = this.modalService.refreshTrigger();
      if (refreshCount > 0) {
        this.loadUsers();
      }
    });
  }

  loadUsers() {
    this.usersService.getAllUsers().subscribe({
      next: (response) => {
        this.users.set(response);
        this.query.set('');
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load users.');
        this.loading.set(false);
      },
    });
  }

  loadCurrentUser() {
    this.usersService.getProfile().subscribe({
      next: (profile) => {
        this.currentUsername.set(profile.username ?? null);
      },
      error: () => {
        console.error('Failed to load current user');
      },
    });
  }

  viewUserDetails(id: string) {
    this.router.navigate(['/user', id]);
  }

  setQuery(query: string) {
    this.query.set(query);
  }

  openTransferModal(username: string) {
    this.modalService.open(username);
  }

  get filteredUsers() {
    return this.users().filter((user) =>
      user.username?.toLowerCase().includes(this.query().toLowerCase())
    );
  }

  isNotCurrentUser(user: User) {
    const currentUsername = this.currentUsername();
    return currentUsername !== null && user.username !== currentUsername;
  }
}
