import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../interfaces/interfaces';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { HomeSkeletonComponent } from '../../components/skeletons/home-skeleton/home-skeleton.component';
import { ToastService } from '../../services/toast/toast.service';
import { TransferLinkGeneratorComponent } from '../../components/transfer-link-generator/transfer-link-generator.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HomeSkeletonComponent, TransferLinkGeneratorComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private usersService = inject(UsersService);
  private transactionsService = inject(TransactionsService);
  private toastService = inject(ToastService);

  user = signal<User | null>(null);
  username = signal<string | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  transactionError = signal<string | null>(null);
  amount = signal<number | null>(null);
  withdrawMode = signal(false);
  submitting = signal(false);

  constructor() {
    this.fetchProfile();
  }

  fetchProfile() {
    this.usersService.getProfile().subscribe({
      next: (profile) => {
        this.user.set(profile);
        this.username.set(profile.username || null);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load profile data');
        this.loading.set(false);
      },
    });
  }

  get amountValue() {
    return this.amount();
  }

  set amountValue(value: number | null) {
    this.amount.set(value);
  }

  toggleMode() {
    this.withdrawMode.set(!this.withdrawMode());
    this.transactionError.set(null);
  }

  submit() {
    const amount = this.amount();
    const user = this.user();

    if (!amount || amount <= 0) {
      this.toastService.error('Amount must be greater than 0.');
      return;
    }

    if (!user) {
      this.toastService.error('You must be logged in to perform this action.');
      return;
    }

    if (this.withdrawMode() && user.balance < amount) {
      this.toastService.error('Insufficient balance.');
      return;
    }

    this.submitting.set(true);

    const transaction$ = this.withdrawMode()
      ? this.transactionsService.withdraw(amount)
      : this.transactionsService.deposit(amount);

    transaction$.subscribe({
      next: () => {
        this.toastService.success('Transaction successful!');
        this.amount.set(null);
        this.fetchProfile();
      },
      error: () => {
        this.toastService.error('Transaction failed!');
      },
      complete: () => {
        this.submitting.set(false);
      },
    });
  }

  generateLink() {
    const currentUsername = this.username();

    if (!currentUsername) {
      this.toastService.error('User not loaded yet.');
      return;
    }
  }

  formatBalance(balance: number): string {
    return balance % 1 === 0 ? balance.toString() : balance.toFixed(3);
  }
}
