import { Component } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent {
user: User = {
  _id: '',
  username: undefined,
  image: undefined,
  balance: 0,
}

constructor(private _user: UsersService){}

ngOnInit(){
  this._user.getProfile().subscribe(response => {this.user = response})
}
}
