import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transferDeposit',
  standalone: true
})
export class TransferDepositPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if((value as string) === 'transfer'){
      return '#dee17d';
    }
    else if((value as string) ==='withdraw'){
      return 'red'
    }
    else{
      return 'green'
    }
  }

}
