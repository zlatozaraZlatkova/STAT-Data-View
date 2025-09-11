import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isSidebarOpen = signal(true);

  onToggleSidebar(): void {
    this.isSidebarOpen.update(currentValue => !currentValue);
  }


}
