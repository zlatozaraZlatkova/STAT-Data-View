import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  isUserMenuOpen = signal(false);

  toggleUserMenu(): void {
    this.isUserMenuOpen.update(currentValue => !currentValue);
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

}
