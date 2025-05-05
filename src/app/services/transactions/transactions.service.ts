import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { transaction } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService extends BaseService {
  deposit(amount: number) {
    return this.put<{ success: boolean; balance: number }, { amount: number }>(
      this.baseUrl + 'transactions/deposit',
      { amount }
    );
  }

  withdraw(amount: number) {
    return this.put<{ success: boolean; balance: number }, { amount: number }>(
      this.baseUrl + 'transactions/withdraw',
      { amount }
    );
  }

  transfer(username: string, amount: number) {
    return this.put<{ success: boolean; balance: number }, { amount: number }>(
      this.baseUrl + `transactions/transfer/${username}`,
      { amount }
    );
  }
  getUserTransactions(){
    return this.get<transaction[]>(
      this.baseUrl+'transactions/my'
    )
  }

}
