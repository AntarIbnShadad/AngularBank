import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transferDeposit',
  standalone: true
})
export class TransferDepositPipe implements PipeTransform {

  transform(type: string, currentUser: string, from: string, to: string): string {
    const isOutgoing = type === 'withdraw' || (type === 'transfer' && from === currentUser);
    const isIncoming = type === 'deposit' || (type === 'transfer' && to === currentUser);

    if (isOutgoing) return 'red';
    if (isIncoming) return 'green';
    return '#999'; // fallback color
  }

}
