import { Component, OnInit, signal } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, take } from 'rxjs';
import { IEstatDataset } from 'src/app/interfaces/metricData';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  population$: Observable<IEstatDataset | null> = this.dataService.population$;

  isSidebarOpen = signal(true);

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
