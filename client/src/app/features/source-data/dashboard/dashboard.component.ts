import { Component, OnInit, signal } from '@angular/core';
import { DataService } from '../data.service';
import { combineLatest, filter, map, Observable, take, tap } from 'rxjs';
import { IEstatDataset } from 'src/app/interfaces/metricData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = signal(true);


  metricsData$: Observable<IEstatDataset[] | null> = combineLatest([
    this.dataService.population$.pipe(filter((data): data is IEstatDataset => data !== null)),
    this.dataService.gdp$.pipe(filter((data): data is IEstatDataset => data !== null)),
  ]).pipe(map(([populationData, gdpData]) => [
    populationData,gdpData
  ]))

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  private loadAllData() {
    this.dataService.getPopulation().pipe(take(1))
      .subscribe({
        next: (data) => console.log('Population data:', data),
      });

    this.dataService.getGdp().pipe(take(1))
      .subscribe({
        next: (data) => console.log('GDP data:', data),
      });
  }


  onToggleSidebar(): void {
    this.isSidebarOpen.update((currentValue) => !currentValue);
  }
}
