import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isOpen: boolean = false;

  dashboardExpanded = signal(true);


  toggleDashboard(): void {
    this.dashboardExpanded.update(currentValue => !currentValue);
  }
}
