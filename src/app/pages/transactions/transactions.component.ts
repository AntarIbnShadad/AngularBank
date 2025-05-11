import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransactionTableSkeletonComponent } from '../../components/skeletons/transaction-table-skeleton/transaction-table-skeleton.component';
import { transaction, User } from '../../interfaces/interfaces';
import { TransferDepositPipe } from '../../pipes/transfer-deposit.pipe';
import { ToastService } from '../../services/toast/toast.service';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { UsersService } from '../../services/users/users.service';
import { IdToUsernamePipe } from '../../pipes/id-to-username.pipe';
import { DatePipe } from '@angular/common';
import { TransferDepositPipe } from '../../pipes/transfer-deposit.pipe';
import { CommonModule } from '@angular/common';
import { TransactionTableSkeletonComponent } from '../../components/skeletons/transaction-table-skeleton/transaction-table-skeleton.component';
import { forkJoin, map } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransactionSignPipe } from '../../pipes/transaction-sign.pipe';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [IdToUsernamePipe, CommonModule, DatePipe, TransferDepositPipe, TransactionTableSkeletonComponent, ReactiveFormsModule,TransactionSignPipe],
  templateUrl: './transactions.component.html',
  styles: ``,
})
export class TransactionsComponent {
  transactionList: transaction[] = [];
  allTransactions: transaction[] = [];
  headers: string[] = [];
  loading = true;
  filterForm: FormGroup;
  currentUser = ''


  constructor(private _transaction: TransactionsService, private _user: UsersService, private fb: FormBuilder){
    this.filterForm = this.fb.group({
      transactionType: ['all'],
      fromDate: [''],
      toDate: [''],
      searchText: [''],
      searchField: ['from'],
    });
  }

  ngOnInit() {
    const userCache = new Map<string, string>();
    this._user.getProfile().subscribe(profile => {
      this.currentUser = profile.username || '' })

    this._transaction.getUserTransactions().subscribe((response) => {
      this.allTransactions = response;

      this._user.getAllUsers().subscribe((users) => {
        this.userList = users;

        // Build a user lookup map from user ID to username
        const userIdToUsername = new Map<string, string>();
        for (const user of users) {
          if (user?._id && user?.username) {
            userIdToUsername.set(user._id, user.username);
          }
        }

        for (const tx of this.allTransactions) {
          if (userIdToUsername.has(tx.from)) {
            tx.from = userIdToUsername.get(tx.from)!;
          }

          if (userIdToUsername.has(tx.to)) {
            tx.to = userIdToUsername.get(tx.to)!;
          }
        }

        this.transactionList = [...this.allTransactions];
        this.loading = false;
      });
    });

    //this.transactionList = [...this.allTransactions]
    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }

  applyFilters(): void {
    const { transactionType, fromDate, toDate, searchText, searchField } =
      this.filterForm.value;

    // Ensure searchField is only 'from' or 'to'
    const field: keyof Pick<transaction, 'from' | 'to'> = searchField;

    this.transactionList = this.allTransactions.filter((tx) => {
      const txDate = new Date(tx.createdAt);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      const matchType =
        transactionType === 'all' || tx.type === transactionType;
      const matchFrom = !from || txDate >= from;
      const matchTo = !to || txDate <= to;

      const searchValue = tx[field]?.toLowerCase() ?? '';
      const matchSearch =
        !searchText || searchValue.includes(searchText.toLowerCase());

      return matchType && matchFrom && matchTo && matchSearch;
    });
  }

  formatAmount(amount: number): string {
    return amount % 1 === 0 ? amount.toString() : amount.toFixed(3);
  }
}
