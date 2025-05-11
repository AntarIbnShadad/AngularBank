import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/interfaces';
import { UsersService } from '../../services/users/users.service';
// ... same imports
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styles: ``,
})
export class ProfileComponent {
  user: User = {
    _id: '',
    username: '',
    image: '',
    balance: 0,
  };

  selectedFile: File | null = null;
  loading = false;
  message = '';
  isEditing = false; // 👈 NEW: toggle edit mode

  constructor(private _user: UsersService) {}

  ngOnInit() {
    this._user.getProfile().subscribe((response) => {
      this.user = response;
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onUpdateProfile() {
    if (!this.user.username) return;

    const formData = new FormData();
    formData.append('username', this.user.username);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.loading = true;
    this._user.updateProfile(formData).subscribe({
      next: (res) => {
        this.message = 'Profile updated successfully!';
        this.user = res; // refresh with updated data
        this.loading = false;
        this.isEditing = false; // 👈 Exit edit mode after update
      },
      error: () => {
        this.message = 'Failed to update profile.';
        this.loading = false;
      },
    });
  }
}
