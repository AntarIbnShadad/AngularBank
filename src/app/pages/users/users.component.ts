import { filter } from 'rxjs';
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
    this.loadCurrentUser();
    effect(() => {
      const refreshCount = this.modalService.refreshTrigger();
      if (refreshCount > 0) {
        this.loadUsers();
      }
    });
  }

  loadCurrentUser() {
    this.usersService.getProfile().subscribe({
      next: (profile) => {
        this.currentUsername.set(profile.username ?? null);
        this.loadUsers();
      },
      error: () => {
        console.error('Failed to load current user');
        this.loadUsers();
      },
    });
  }

  loadUsers() {
    this.usersService.getAllUsers().subscribe({
      next: (response) => {
        const currentUsername = this.currentUsername();
        const filteredResponse = response.filter(
          (user) => user.username !== currentUsername
        );

        this.users.set(filteredResponse);
        this.query.set('');
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load users.');
        this.loading.set(false);
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
}
