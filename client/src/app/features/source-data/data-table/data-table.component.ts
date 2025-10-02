import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { IEstatDataset, IHouseholdIndicators } from 'src/app/interfaces/metricData';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  
  indicators$!: Observable<IHouseholdIndicators[]>;
  lastUpdated$!: Observable<string>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.initializeStreams();
    this.loadData();
  }

  private loadData(): void {
    this.dataService.getNominalCapitaIncomeGrowth().subscribe();
    this.dataService.getRealCapitaIncomeGrowth().subscribe();
    this.dataService.getSavingRate().subscribe();
    this.dataService.getInvestmentRate().subscribe();
  }

  private initializeStreams(): void {
    this.indicators$ = this.createIndicatorsStream();
    this.lastUpdated$ = this.createLastUpdatedStream();
  }


  private createIndicatorsStream(): Observable<IHouseholdIndicators[]> {
    return combineLatest([
      this.dataService.nominalCapitaIncomeGrowth$,
      this.dataService.realPerCapitaIncomeGrowth$,
      this.dataService.savingRate$,
      this.dataService.investmentRate$
    ]).pipe(
      map(([nominal, real, saving, investment]) => {
        if (!nominal || !real || !saving || !investment) return [];
        
        return [
          this.formatIndicator('Nominal Income Growth', nominal),
          this.formatIndicator('Real Income Growth', real),
          this.formatIndicator('Saving Rate', saving),
          this.formatIndicator('Investment Rate', investment)
        ];
      })
    );
  }

  private createLastUpdatedStream(): Observable<string> {
    return this.dataService.nominalCapitaIncomeGrowth$.pipe(
      map(data => data ? this.extractLastPeriod(data) : '')
    );
  }


  private formatIndicator(label: string, dataset: IEstatDataset): IHouseholdIndicators{
    const values = this.extractValues(dataset);
    const change = values.current - values.previous;
    const yoyChange = values.fiveYearAgo;

    return {
      label,
      current: `${values.current.toFixed(1)}%`,
      previous: `${values.previous.toFixed(1)}%`,
      change: `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`,
      yoyChange: `${yoyChange >= 0 ? '+' : ''}${yoyChange.toFixed(1)}%`,
      changeClass: change >= 0 ? 'text-green-600' : 'text-red-600',
      yoyClass: yoyChange >= 0 ? 'text-green-600' : 'text-red-600'
    };
  }

  private extractValues(dataset: IEstatDataset) {
    const values = Object.values(dataset.value) as number[];
    
    return {
      current: values[values.length - 1],
      previous: values[values.length - 2],
      fiveYearAgo: values[values.length - 6] 
    };
  }

  private extractLastPeriod(dataset: IEstatDataset): string {
    const times = Object.keys(dataset.dimension.time.category.index);
    return times[times.length - 1] || '';
  }

}