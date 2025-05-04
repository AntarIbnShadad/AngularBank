import { inject, Pipe, PipeTransform } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'idToUsername',
  standalone: true
})
export class IdToUsernamePipe implements PipeTransform {

  _user = inject(UsersService)
  transform(value: unknown, ...args: unknown[]): Observable<string> {
    let username = ''
      return this._user.getUser(value as string).pipe(
        map(user => user.username || '')
      );
  }

}
