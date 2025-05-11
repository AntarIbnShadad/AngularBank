import { Component, computed, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { ToastService } from '../../services/toast/toast.service';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  modalService = inject(ModalService);
  private transactionsService = inject(TransactionsService);
  private toastService = inject(ToastService);
  private usersService = inject(UsersService);

  readonly isVisible = computed(() => this.modalService.isOpen());
  readonly username = computed(() => this.modalService.content());

  amount = signal<number | null>(null);
  submitting = signal(false);
  currentUser = signal<User | null>(null);

  constructorEffect = effect(() => {
    if (this.isVisible()) {
      this.usersService.getProfile().subscribe({
        next: (profile) => this.currentUser.set(profile),
        error: () => this.toastService.error('Failed to load current user.'),
      });
    }
  });

  transfer() {
    const username = this.modalService.content();
    const amount = this.amount();
    const balance = this.currentUser()?.balance ?? 0;

    if (!username || !amount || amount <= 0) {
      this.toastService.error('Please enter a valid amount.');
      return;
    }

    if (amount > balance) {
      this.toastService.error('Insufficient balance for this transfer.');
      return;
    }

    this.submitting.set(true);

    this.transactionsService.transfer(username, amount).subscribe({
      next: () => {
        this.toastService.success('Transferred successfully!');
        this.modalService.notifyTransferSuccess();
        this.modalService.close();
        this.amount.set(null);
      },
      error: (err) => {
        if (err.status === 404) {
          this.toastService.error('Recipient account does not exist.');
        } else if (err.status === 400) {
          this.toastService.error('Insufficient balance.');
        } else {
          this.toastService.error('Transfer failed.');
        }
      },
      complete: () => {
        this.submitting.set(false);
      },
    });
  }
  formatBalance(balance: number): string {
    return balance % 1 === 0 ? balance.toString() : balance.toFixed(3);
  }
}
