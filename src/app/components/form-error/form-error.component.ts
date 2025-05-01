import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [],
  templateUrl: './form-error.component.html',
})
export class FormErrorComponent {
  @Input() control: AbstractControl | null = null;
  @Input() fieldName: string = 'Field';
}
