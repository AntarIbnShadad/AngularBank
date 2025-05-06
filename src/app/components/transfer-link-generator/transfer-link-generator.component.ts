import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-transfer-link-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfer-link-generator.component.html',
  styles: ``
})

export class TransferLinkGeneratorComponent {
  amount: number | null = null;
  recipientUsername = '';
  generatedLink: string = '';
  copied = false;
  senderUsername: string = '';
  loading = true;
  error = '';

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.senderUsername = user.username || '';
        this.loading = false;
      },
      error: (err) => {
        this.error = 'You must be logged in to generate a link.';
        this.loading = false;
      },
    });
  }

  generateLink() {
    if (this.loading || this.error || !this.senderUsername) {
      alert('You must be logged in to generate a link.');
      return;
    }

    if (!this.amount || !this.recipientUsername) return;

    this.generatedLink = `${location.origin}/confirm-transfer/${this.senderUsername}/${this.amount}?recipient=${this.recipientUsername}`;
    this.copied = false;
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.generatedLink).then(() => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });
  }
}
