import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MetricCardComponent } from './metric-card/metric-card.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ChartComponent } from './chart/chart.component';
import { RouterModule } from '@angular/router';
import { SourceDataRoutingModule } from './source-data-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';


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
    MatIconModule
  ]
})
export class SourceDataModule { }
