import { Component } from '@angular/core';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { transaction } from '../../interfaces/interfaces';
import { UsersService } from '../../services/users/users.service';
import { IdToUsernamePipe } from '../../pipes/id-to-username.pipe';
import { DatePipe } from '@angular/common';
import { TransferDepositPipe } from '../../pipes/transfer-deposit.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [IdToUsernamePipe, CommonModule, DatePipe, TransferDepositPipe],
  templateUrl: './transactions.component.html',
  styles: ``
})
export class TransactionsComponent {
  transactionList: transaction[] = []
  headers: string[] = []
  constructor(private _transaction: TransactionsService, private _user: UsersService){}

  ngOnInit(){
    this._transaction.getUserTransactions().subscribe(response => {
      this.transactionList = response
        })
    }

  }
   
  
