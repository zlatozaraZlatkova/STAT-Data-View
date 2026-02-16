import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { IEstatDataset } from 'src/app/interfaces/metricData';
import { DataService } from '../data.service';
import { getAvailableYearsWithValues, getLastDataYearWithUpdate } from 'src/app/shared/utils/dataset-processor';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
  public chartType: ChartType = 'line';
  private destroy$ = new Subject<void>();
  private readonly YEARS_TO_DISPLAY = 10;

  lastUpdated$ = getLastDataYearWithUpdate(this.dataService.tradeBalance$);

  public chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        spanGaps: true,
        label: 'International trade, by reporting country, total product - annual data, in Mio EUR',
        borderColor: 'rgb(239 68 68)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        yAxisID: 'y',
      },
      {
        data: [],
        spanGaps: true,
        label: 'Direct investment liabilities (flows) - annual data, % of GDP',
        borderColor: 'rgb(59 130 246)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        yAxisID: 'y1',
      },
      {
        data: [],
        spanGaps: true,
        label: 'General government gross debt - annual data, % of GDP',
        borderColor: 'rgb(0 170 68)',
        backgroundColor: 'rgba(0, 170, 68, 0.1)',
        pointBackgroundColor: 'rgb(0 170 68)',
        yAxisID: 'y1',
      },
      {
        data: [],
        spanGaps: true,
        label: 'Production in industry - annual data production volume index(2021=100)',
        borderColor: 'rgb(255 136 0)',
        backgroundColor: 'rgba(255, 136, 0, 0.1)',
        pointBackgroundColor: 'rgb(255 136 0)',
        yAxisID: 'y1',
      },
      {
        data: [],
        spanGaps: true,
        label: 'General government deficit and surplus - annual data, % of GDP',
        borderColor: 'rgb(108, 59, 170)',
        backgroundColor: 'rgba(108, 59, 170, 0.1)',
        pointBackgroundColor: 'rgb(108, 59, 170)',
        yAxisID: 'y1',
      }
    ],
  };

  public chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'start',
        labels: {
          boxWidth: 12,
          padding: 15,
          usePointStyle: true,
        },
      }
    },
    scales: {
      y: {
        position: 'left',
        title: { display: true, text: 'Total Trade in Mio EUR' },
      },
      y1: {
        position: 'right',
        title: { display: true, text: 'FDI (% GDP)' },
        grid: { drawOnChartArea: false },
      },
    },
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.setupDataSubscriptions();
  }

  private setupDataSubscriptions(): void {
    const datasets$ = [
      this.dataService.tradeBalance$,
      this.dataService.foreignDirectInvestment$,
      this.dataService.governmentDebt$,
      this.dataService.industryProduction$,
      this.dataService.govDeficitSurplus$
    ];

    datasets$.forEach((dataset$, index) => {
      dataset$.pipe(takeUntil(this.destroy$)).subscribe(data => {
        if (data) this.updateChartWithData(data, index);
      });
    });
  }

  private updateChartWithData(data: IEstatDataset, dataIndex: number): void {
    const yearsData = getAvailableYearsWithValues(data);
    
    if (yearsData.length === 0) {
      this.chartData.datasets[dataIndex].data = [];
      this.chart?.update();
      return;
    }

    const recentYears = yearsData.slice(-this.YEARS_TO_DISPLAY);
    const labels = recentYears.map(item => item.year);
    const values = recentYears.map(item => item.value);

    if (dataIndex === 0) {
      this.chartData.labels = labels;
    }

    this.chartData.datasets[dataIndex].data = values;
    this.chart?.update();
  }

  hasChartData(): boolean {
    return this.chartData.datasets.some(dataset => 
      dataset.data && dataset.data.length > 0
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}