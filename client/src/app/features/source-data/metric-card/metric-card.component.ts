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
    const timeIndexArr = Object.values(data.dimension.time.category.index);
    const values = data.value;

    let currentYearIndex: number; 
    let previousYearIndex: number;

    if(timeIndexArr.length >= 1) {
      currentYearIndex = Number(timeIndexArr[timeIndexArr.length - 1]); 
      this.currentValues = values[currentYearIndex] 
    }

    if(timeIndexArr.length >= 2) {
      previousYearIndex = Number(timeIndexArr[timeIndexArr.length - 2]); 
      this.previousYearValue = values[previousYearIndex]; 
    } 


    if (this.currentValues !== undefined && this.previousYearValue !== undefined) {  
      this.absoluteDifference = this.currentValues - this.previousYearValue;

      this.percentageDifference = Number(
        ((this.absoluteDifference / this.previousYearValue) * 100).toFixed(2) 
      );
    }

  }





}
