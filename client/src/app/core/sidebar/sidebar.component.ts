import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isOpen = signal(false);
  dashboardExpanded = signal(false);

  toggle(): void {
    this.isOpen.update(val => !val);
  }
  toggleDashboard(): void {
    this.dashboardExpanded.update(currentValue => !currentValue);
  }
}
