import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-confirm-transfer',
  standalone: true,
  imports: [],
  templateUrl: './confirm-transfer.component.html',
  styles: ``,
})
export class ConfirmTransferComponent {
  _id = '';
  senderUsername = '';
  amount = 0;
  intendedRecipient = '';
  currentUsername: string | undefined = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private txService: TransactionsService,
    private router: Router,
    private userService: UsersService
  ) {
    const { from, amount } = this.route.snapshot.params;
    this.senderUsername = from;
    this.amount = parseFloat(amount);
    this.intendedRecipient =
      this.route.snapshot.queryParamMap.get('recipient') || '';
  }

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.currentUsername = user.username;

        if (this.currentUsername !== this.intendedRecipient) {
          this.error =
            'You are not authorized to accept this transfer request.';
        }
      },
      error: () => {
        this.toastService.error('Could not verify user.');
      },
    });
  }

  accept() {
    if (this.currentUsername !== this.intendedRecipient) return;

    this.loading = true;
    this.txService.transfer(this.senderUsername, this.amount).subscribe({
      next: () => this.router.navigate(['/users']),
      error: (err) => {
        this.toastService.error(err.error?.message || 'Transfer failed');
        this.loading = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
