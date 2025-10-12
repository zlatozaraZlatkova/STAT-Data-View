import { Component, Input, OnInit } from '@angular/core';
import { IEstatDataset } from 'src/app/interfaces/metricData';



@Component({
  selector: 'app-metric-card',
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.css']
})
export class MetricCardComponent implements OnInit {
  @Input() data!: IEstatDataset;

  currentValues: number = 0;
  previousYearValue: number = 0;
  absoluteDifference: number = 0;
  percentageDifference: number = 0;

  ngOnInit(): void {
    this.calculateYearlyMetrics(this.data);
  }

  private calculateYearlyMetrics(data: IEstatDataset) {
    const timeIndexArr = Object.values(data.dimension.time.category.index);
    const values = data.value;

    if (!data.value || Object.keys(data.value).length === 0) {
      return;
    }

    let currentYearIndex: number;
    let previousYearIndex: number;

    if (timeIndexArr.length >= 1) {
      currentYearIndex = Number(timeIndexArr[timeIndexArr.length - 1]);
      this.currentValues = values[currentYearIndex]
    }

    if (timeIndexArr.length >= 2) {
      previousYearIndex = Number(timeIndexArr[timeIndexArr.length - 2]);
      this.previousYearValue = values[previousYearIndex];
    }


    if (this.currentValues !== undefined && this.previousYearValue !== undefined) {
      this.absoluteDifference = this.currentValues - this.previousYearValue;

      this.percentageDifference = this.previousYearValue
        ? Math.round((this.absoluteDifference / this.previousYearValue) * 100 * 100) / 100
        : 0;

    }

  }


  getFormattedValue(): string {
    const unitCategory = this.data.dimension.unit?.category;

    if (unitCategory?.index) {
      const unitCode = Object.keys(unitCategory.index)[0];


      switch (unitCode) {
        case 'THS_PER':
          const millions = (this.currentValues / 1000).toFixed(1);
          return Number(millions).toLocaleString('en-US') + 'M';
        case 'CLV10_MEUR':
          const billions = (this.currentValues / 1000).toFixed(1);
          return Number(billions).toLocaleString('en-US') + 'B';
        case 'RCH_A_AVG':
          return this.currentValues.toLocaleString('en-US') + '%';
        default:
          return this.currentValues.toLocaleString('en-US');
      }

    }

    return Number(this.currentValues).toLocaleString('en-US');
  }

}
