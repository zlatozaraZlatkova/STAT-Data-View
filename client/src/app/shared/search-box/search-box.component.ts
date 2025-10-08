import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  @Output() searchChange = new EventEmitter<string>();
  searchText: string = '';

  onSearchChange(): void {
    if (!this.searchText) {
      return
    }

    this.searchChange.emit(this.searchText);
  }


  onClearSearch(): void {
    this.searchText = '';
    this.searchChange.emit();
  }

}
