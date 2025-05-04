import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chyron',
  standalone: true,
  imports: [],
  templateUrl: './chyron.component.html',
})
export class ChyronComponent {

@Input() Text: string[] = []

constructor() {}



}
