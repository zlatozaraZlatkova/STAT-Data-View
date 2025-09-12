import { Component, OnInit, signal } from '@angular/core';
import { DataService } from '../data.service';
import { filter, Observable, take, tap } from 'rxjs';
import { IEstatDataset } from 'src/app/interfaces/metricData';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = signal(true);

  currentPopulation: number = 0;
  previousYearPopulation: number = 0;
  populationDiff: number = 0;
  populationDiffPercent: number = 0;

  population$: Observable<IEstatDataset | null> = this.dataService.population$.pipe(
    filter((data): data is IEstatDataset => data !== null),
    tap((data) => {
      console.log(data)
      const values = Object.values(data.value) as number[];

      if (values.length >= 1) {
        this.currentPopulation = values[values.length - 1];
      }

      if (values.length >= 2) {
        this.previousYearPopulation = values[values.length - 2];
        this.populationDiff = values.slice(-2).reduce((a, b) => (b - a));
        this.populationDiffPercent = Number(((this.populationDiff / this.previousYearPopulation) * 100).toFixed(2));
      }

    })
  )


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadPopulationData();
  }

  private loadPopulationData() {
    this.dataService.getPopulation().pipe(take(1)).subscribe({
      next: (data) => {
        console.log(data)
      }
    });
  }


  onToggleSidebar(): void {
    this.isSidebarOpen.update(currentValue => !currentValue);
  }


}
