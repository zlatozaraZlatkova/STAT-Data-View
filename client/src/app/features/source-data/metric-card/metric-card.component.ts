import { Component, Input } from '@angular/core';
import { IEstatDataset } from 'src/app/interfaces/metricData';

@Component({
  selector: 'app-metric-card',
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.css']
})
export class MetricCardComponent {
  @Input() data!: IEstatDataset;
  @Input() currentPopulation!: number;
  @Input() populationDiffPercent!: number;



}
