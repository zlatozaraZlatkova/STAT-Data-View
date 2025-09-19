import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { NgChartsModule } from 'ng2-charts';

import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MetricCardComponent } from './metric-card/metric-card.component';
import { DataTableComponent } from './data-table/data-table.component';
import { SourceDataRoutingModule } from './source-data-routing.module';
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
    SharedModule,
    RouterModule,
    SourceDataRoutingModule,
    MatTooltipModule,
    MatIconModule,
    NgChartsModule 
  ]
})
export class SourceDataModule { }
