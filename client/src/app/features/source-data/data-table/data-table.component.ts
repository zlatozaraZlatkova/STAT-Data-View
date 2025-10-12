import { Component, OnInit } from '@angular/core';
import { combineLatest, filter, map, Observable } from 'rxjs';

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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.initializeStreams();
  }

  private initializeStreams(): void {
    this.indicators$ = this.createIndicatorsStream();
    this.lastUpdated$ = this.createLastUpdatedStream();
  }

  private createIndicatorsStream(): Observable<IHouseholdIndicators[]> {
    return combineLatest([
      this.dataService.nominalCapitaIncomeGrowth$.pipe(filter((data): data is IEstatDataset => data !== null)),
      this.dataService.realPerCapitaIncomeGrowth$.pipe(filter((data): data is IEstatDataset => data !== null)),
      this.dataService.savingRate$.pipe(filter((data): data is IEstatDataset => data !== null)),
      this.dataService.investmentRate$.pipe(filter((data): data is IEstatDataset => data !== null)),
    ]).pipe(
      map(([nominal, real, saving, investment]) => {

        if (!this.isValidDataset(nominal) ||
          !this.isValidDataset(real) ||
          !this.isValidDataset(saving) ||
          !this.isValidDataset(investment)) {
          return [];
        }

        return [
          this.formatIndicator('Nominal Income Growth', nominal),
          this.formatIndicator('Real Income Growth', real),
          this.formatIndicator('Saving Rate', saving),
          this.formatIndicator('Investment Rate', investment)
        ];
      })
    );
  }


  private isValidDataset(dataset: IEstatDataset): boolean {
    if (!dataset || !dataset.value || !dataset.dimension?.time?.category?.index) {
      return false;
    }

    const values = Object.values(dataset.value) as number[];

    if (values.length < 6) {
      return false;
    }

    return true;

  }

  private formatIndicator(label: string, dataset: IEstatDataset): IHouseholdIndicators {
    const values = this.extractValues(dataset);
    const change = Math.round((values.current - values.previous) * 20) / 20;
    const yoyChange = Math.round((values.current - values.fiveYearAgo) * 20) / 20;

    return {
      label,
      current: `${(Math.round(values.current * 20) / 20).toFixed(2)}%`,
      previous: `${(Math.round(values.previous * 20) / 20).toFixed(2)}%`,
      change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
      yoyChange: `${yoyChange >= 0 ? '+' : ''}${yoyChange.toFixed(2)}%`,
      changeClass: change >= 0 ? 'text-green-600' : 'text-red-600',
      yoyClass: yoyChange >= 0 ? 'text-green-600' : 'text-red-600'
    };
  }

  private extractValues(dataset: IEstatDataset) {
    const values = Object.values(dataset.value) as number[];

    return {
      current: values[values.length - 1] || 0,
      previous: values[values.length - 2] || 0,
      fiveYearAgo: values[values.length - 6] || 0
    };
  }

  private createLastUpdatedStream(): Observable<string> {
    return this.dataService.nominalCapitaIncomeGrowth$.pipe(
      map(data => data ? this.extractLastPeriod(data) : '')
    );
  }


  private extractLastPeriod(dataset: IEstatDataset): string {
    if (!dataset?.dimension?.time?.category?.index) {
      return '';
    }
    const times = Object.keys(dataset.dimension.time.category.index);
    return times[times.length - 1] || '';
  }

}