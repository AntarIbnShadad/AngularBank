import { Component, computed } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  constructor(public modalService: ModalService) {}

  readonly isVisible = computed(() => this.modalService.isOpen());
}
