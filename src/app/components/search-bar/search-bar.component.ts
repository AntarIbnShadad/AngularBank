import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnChanges {
  @Input() searchQuery = '';
  @Output() search = new EventEmitter<string>();

  localSearchQuery = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery']) {
      this.localSearchQuery = this.searchQuery ?? '';
    }
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.localSearchQuery = input.value;
    this.search.emit(input.value);
  }
}
