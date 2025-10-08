import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Output() pageChange = new EventEmitter<number>();


  onPageChange(page: number | null | undefined): void {
    if (page != null && page > 0) {
      this.pageChange.emit(page);
    }
  }
  
}

