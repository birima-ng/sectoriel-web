import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
selector: 'app-config-pagination',
templateUrl: './config-pagination.component.html',
styleUrls: ['./config-pagination.component.scss']
})
export class ConfigPaginationComponent {
@Input() currentPage: number = 0;
@Input() totalPages: number = 0;
@Input() pageSize: number = 10;

// 👇 Défini par défaut dans le composant, mais surchageable
private _pageSizeOptions: number[] = [10, 15, 25, 50];

@Input()
set pageSizeOptions(value: number[]) {
    this._pageSizeOptions = value?.length ? value : [10, 15, 25, 50];
  }

  get pageSizeOptions(): number[] {
    return this._pageSizeOptions;
  }

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  onClickPage(page: number | string): void {
    if (typeof page === 'number') {
      this.goToPage(page - 1); // affichage commence à 1
    }
  }

  onPageSizeChange(size: number): void {
    this.pageSizeChange.emit(size);
  }

  getPages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const current = this.currentPage + 1;

    if (this.totalPages <= 7) {
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      const start = Math.max(current - 1, 2);
      const end = Math.min(current + 1, this.totalPages - 1);

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < this.totalPages - 1) pages.push('...');

      pages.push(this.totalPages);
    }

    return pages;
  }
}
