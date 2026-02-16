import { Component, Input, OnInit } from '@angular/core';
import { IEstatDataset } from 'src/app/interfaces/metricData';
import { processDataset } from '../../../shared/utils/dataset-processor';

@Component({
  selector: 'app-metric-card',
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.css'],
})
export class MetricCardComponent implements OnInit {
  @Input() data!: IEstatDataset;

  currentValues: number = 0;
  previousYearValue: number = 0;
  absoluteDifference: number = 0;
  percentageDifference: number = 0;
  hasData: boolean = false;

  ngOnInit(): void {
    this.calculateYearlyMetrics(this.data);
  }

  private calculateYearlyMetrics(data: IEstatDataset) {
    if (!data?.value || Object.keys(data.value).length === 0) {
      this.hasData = false;
      return;
    }

    const result = processDataset(data);

    this.hasData = result.hasData;

    if (!result.hasData) {
      return;
    }
    this.currentValues = result.currentValue;
    this.previousYearValue = result.previousValue ?? 0;

    if (
      this.previousYearValue !== undefined &&
      !isNaN(this.currentValues) &&
      !isNaN(this.previousYearValue)
    ) {
      this.absoluteDifference = this.currentValues - this.previousYearValue;
      this.percentageDifference =
        this.previousYearValue !== 0
          ? Math.round(
            (this.absoluteDifference / this.previousYearValue) * 100 * 100,
          ) / 100
          : 0;
    }
  }

  getFormattedValue(): string {
    if (!this.hasData || isNaN(this.currentValues)) {
      return 'No data';
    }

    const unitCategory = this.data.dimension.unit?.category;

    if (unitCategory?.index) {
      const unitCode = Object.keys(unitCategory.index)[0];

      switch (unitCode) {
        case 'THS_PER':
          const millions = this.currentValues / 1000;
          return (
            millions.toLocaleString('en-US', {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }) + 'M'
          );

        case 'CLV10_MEUR':
          const billions = this.currentValues / 1000;
          return (
            billions.toLocaleString('en-US', {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }) + 'B'
          );

        case 'RCH_A_AVG':
          return (
            this.currentValues.toLocaleString('en-US', {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }) + '%'
          );

        default:
          return this.currentValues.toLocaleString('en-US');
      }
    }

    return this.currentValues.toLocaleString('en-US');
  }
}
