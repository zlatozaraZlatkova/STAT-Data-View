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
    this.calculateYearlyMetrics(this.data)
  }

  private calculateYearlyMetrics(data: IEstatDataset) {
    console.log(data)

  }





}
