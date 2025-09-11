import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataTableComponent } from './data-table/data-table.component';
import { MetricCardComponent } from './metric-card/metric-card.component';
import { ChartComponent } from './chart/chart.component';



@NgModule({
  declarations: [
    DashboardComponent, 
    MetricCardComponent,
    DataTableComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FeaturesModule { }
