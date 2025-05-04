import { Component } from '@angular/core';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { transaction } from '../../interfaces/interfaces';
import { UsersService } from '../../services/users/users.service';
import { IdToUsernamePipe } from '../../pipes/id-to-username.pipe';
import { DatePipe } from '@angular/common';
import { TransferDepositPipe } from '../../pipes/transfer-deposit.pipe';
import { CommonModule } from '@angular/common';
import { TransactionTableSkeletonComponent } from '../../components/skeletons/transaction-table-skeleton/transaction-table-skeleton.component';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [IdToUsernamePipe, CommonModule, DatePipe, TransferDepositPipe, TransactionTableSkeletonComponent],
  templateUrl: './transactions.component.html',
  styles: ``
})
export class TransactionsComponent {
  transactionList: transaction[] = []
  headers: string[] = []
  loading = true
  constructor(private _transaction: TransactionsService, private _user: UsersService){}

  ngOnInit() {
    const userCache = new Map<string, string>();

    this._transaction.getUserTransactions().subscribe(response => {
      this.transactionList = response;
  
      const userFetches: any[] = [];
  
      for (const tx of this.transactionList) {

        if (userCache.has(tx.from)) {
          tx.from = userCache.get(tx.from) || '';
        } else {
          const obs = this._user.getUser(tx.from).pipe(
            map(user => {
              const username = user?.username || '';
              userCache.set(tx.from, username);
              tx.from = username;
            })
          );
          userFetches.push(obs);
        }
  
        if (userCache.has(tx.to)) {
          tx.to = userCache.get(tx.to) || '';
        } else {
          const obs = this._user.getUser(tx.to).pipe(
            map(user => {
              const username = user?.username || '';
              userCache.set(tx.to, username);
              tx.to = username;
            })
          );
          userFetches.push(obs);
        }
      }
  
      if (userFetches.length > 0) {
        forkJoin(userFetches).subscribe(() => {
          this.loading = false;
        });
      } else {
        // All names were cached
        this.loading = false;
      }
    });
  }

  }
   
  
