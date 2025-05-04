import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users/users.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-deposit-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deposit-link.component.html',
})
export class DepositLinkComponent {
  accountUsername = '';
  amount = signal<number | null>(null);
  isOwner = signal(false);
  ownerUsername = signal<string>('');
  currentUsername = signal<string | null>(null);
  transferConfirmed = signal(false);

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private toastService: ToastService
  ) {
    this.accountUsername =
      this.route.snapshot.queryParamMap.get('account') || '';
    this.amount.set(Number(this.route.snapshot.queryParamMap.get('amount')));

    this.usersService.getProfile().subscribe((user) => {
      this.currentUsername.set(user.username || null);
      this.isOwner.set(user.username === this.accountUsername);
    });

    this.ownerUsername.set(this.accountUsername);
  }

  updateAmount(event: Event) {
    const input = event.target as HTMLInputElement;
    this.amount.set(Number(input.value));
  }

  get shareableLink() {
    return `/deposit?account=${this.accountUsername}&amount=${this.amount()}`;
  }

  copyLink() {
    navigator.clipboard.writeText(this.shareableLink).then(() => {
      this.toastService.success('Link copied to clipboard!');
    });
  }

  confirmTransfer() {
    this.toastService.success('Thank you! Transfer confirmed.');
    this.transferConfirmed.set(true);
  }
}
