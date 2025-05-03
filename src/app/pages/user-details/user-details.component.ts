import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../interfaces/interfaces';
import { UsersService } from '../../services/users/users.service';
import { UserDetailsSkeletonComponent } from '../../components/skeletons/user-details-skeleton/user-details-skeleton.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, UserDetailsSkeletonComponent],
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent {
  user = signal<User | null>(null);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usersService = inject(UsersService);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usersService.getUser(id).subscribe({
        next: (res) => this.user.set(res),
        error: (err) => console.error('Failed to fetch user:', err),
      });
    }
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
