import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/interfaces';
import { UsersService } from '../../services/users/users.service';
import { UserDetailsSkeletonComponent } from '../../components/skeletons/user-details-skeleton/user-details-skeleton.component';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, UserDetailsSkeletonComponent],
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent {
  user = signal<User | null>(null);
  transferCounter = signal(0);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usersService = inject(UsersService);
  private modalService = inject(ModalService);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchUser(id);
    }

    effect(() => {
      this.modalService.refreshTrigger();
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.fetchUser(id);
      }
    });
  }

  fetchUser(id: string) {
    this.usersService.getUser(id).subscribe({
      next: (res) => this.user.set(res),
      error: (err) => console.error('Failed to fetch user:', err),
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }

  openTransferModal(username: string) {
    this.modalService.open(username);
  }
}
