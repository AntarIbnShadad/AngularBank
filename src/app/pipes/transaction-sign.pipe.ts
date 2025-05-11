import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionSign',
  standalone: true
})
export class TransactionSignPipe implements PipeTransform {


  transform(amount: number, type: string, currentUser: string, from: string): string {
    const isOutgoing = (type === 'withdraw') || (type === 'transfer' && from === currentUser);
    const formatted = amount.toFixed(3);
    return isOutgoing ? `- ${formatted}` : `+ ${formatted}`;
  }

}
