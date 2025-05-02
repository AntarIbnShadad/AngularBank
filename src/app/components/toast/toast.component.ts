import { Component, computed, inject } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  private toastService = inject(ToastService);
  toasts = computed(() => this.toastService.toastSignal());
}
