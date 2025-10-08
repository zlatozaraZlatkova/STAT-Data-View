import { Component, signal } from '@angular/core';
import { DataService } from '../data.service';
import { combineLatest, filter, Observable } from 'rxjs';
import { IEstatDataset } from 'src/app/interfaces/metricData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  isSidebarOpen = signal(true);

  metricsData$: Observable<IEstatDataset[] | null> = combineLatest([
    this.dataService.population$.pipe(filter((data): data is IEstatDataset => data !== null)),
    this.dataService.gdp$.pipe(filter((data): data is IEstatDataset => data !== null)),
    this.dataService.employment$.pipe(filter((data): data is IEstatDataset => data !== null)),
    this.dataService.inflation$.pipe(filter((data): data is IEstatDataset => data !== null))
  ]);

  constructor(private dataService: DataService) { }

  onToggleSidebar(): void {
    this.isSidebarOpen.update((currentValue) => !currentValue);
  }
}
