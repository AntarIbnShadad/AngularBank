import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details-skeleton.component.html',
})
export class UserDetailsSkeletonComponent {
  private router = inject(Router);
  goBack() {
    this.router.navigate(['/users']);
  }
}
