import { Component, OnInit } from '@angular/core';
import { combineLatest, filter, map, Observable } from 'rxjs';

import {
  IEstatDataset,
  IHouseholdIndicators,
} from 'src/app/interfaces/metricData';
import { DataService } from '../data.service';
import { getAvailableYearsWithValues, getLastDataYearWithUpdate } from '../../../shared/utils/dataset-processor';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  indicators$!: Observable<IHouseholdIndicators[]>;
  lastUpdated$!: Observable<string>;


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.indicators$ = this.createIndicatorsStream();
    this.lastUpdated$ = getLastDataYearWithUpdate(this.dataService.nominalCapitaIncomeGrowth$);
  }

  private createIndicatorsStream(): Observable<IHouseholdIndicators[]> {
    return combineLatest([
      this.dataService.nominalCapitaIncomeGrowth$.pipe(
        filter((data): data is IEstatDataset => data !== null),
      ),
      this.dataService.realPerCapitaIncomeGrowth$.pipe(
        filter((data): data is IEstatDataset => data !== null),
      ),
      this.dataService.savingRate$.pipe(
        filter((data): data is IEstatDataset => data !== null),
      ),
      this.dataService.investmentRate$.pipe(
        filter((data): data is IEstatDataset => data !== null),
      ),
    ]).pipe(
      map(
        ([nominal, real, saving, investment]) =>
          [
            this.formatIndicator('Nominal Income Growth', nominal),
            this.formatIndicator('Real Income Growth', real),
            this.formatIndicator('Saving Rate', saving),
            this.formatIndicator('Investment Rate', investment),
          ].filter((indicator) => indicator !== null) as IHouseholdIndicators[],
      ),
    );
  }

  private formatIndicator(label: string, dataset: IEstatDataset): IHouseholdIndicators | null {
    const yearsData = getAvailableYearsWithValues(dataset);

    if (yearsData.length < 6) {
      return null;
    }

    const current = yearsData[yearsData.length - 1].value;
    const previous = yearsData[yearsData.length - 2].value;
    const fiveYearAgo = yearsData[yearsData.length - 6].value;

    const change = current - previous;
    const yoyChange = current - fiveYearAgo;

    return {
      label,
      current: `${current.toFixed(2)}%`,
      previous: `${previous.toFixed(2)}%`,
      change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
      yoyChange: `${yoyChange >= 0 ? '+' : ''}${yoyChange.toFixed(2)}%`,
      changeClass: change >= 0 ? 'text-green-600' : 'text-red-600',
      yoyClass: yoyChange >= 0 ? 'text-green-600' : 'text-red-600'
    };
  }

}
