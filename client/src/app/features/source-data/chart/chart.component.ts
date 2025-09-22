import { Component, OnInit, ViewChild } from '@angular/core';
import { IEstatDataset } from 'src/app/interfaces/metricData';
import { DataService } from '../data.service';
import { catchError, combineLatest, filter, Observable, of, take } from 'rxjs';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public chartType: ChartType = 'line';

  chartData$: Observable<IEstatDataset[] | null> = combineLatest([
    this.dataService.tradeBalance$.pipe(filter((data): data is IEstatDataset => data !== null)),
    this.dataService.foreignDirectInvestment$.pipe(filter((data): data is IEstatDataset => data !== null)),
    this.dataService.governmentDebt$.pipe(filter((data): data is IEstatDataset => data !== null)),
    this.dataService.industryProduction$.pipe(filter((data): data is IEstatDataset => data !== null)),
    this.dataService.govDeficitSurplus$.pipe(filter((data): data is IEstatDataset => data !== null)),

  ]).pipe(
    catchError(err => {
      console.error('Error loading metrics:', err);
      return of(null);
    })
  );

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  public chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label:
          'International trade, by reporting country, total product - annual data, in Mio EUR',
        borderColor: 'rgb(239 68 68)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        yAxisID: 'y',
      },
      {
        data: [],
        label: 'Direct investment liabilities (flows) - annual data, % of GDP',
        borderColor: 'rgb(59 130 246)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        yAxisID: 'y1',
      },
      {
        data: [],
        label: 'Direct investment liabilities (flows) - annual data, % of GDP',
        borderColor: 'rgb(0 170 68)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        pointBackgroundColor: 'rgb(0 170 68)',
        yAxisID: 'y1',
      },
      {
        data: [],
        label: 'Production in industry - annual data production volume index(2021=100)',
        borderColor: 'rgb(255 136 0)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        pointBackgroundColor: 'rgb(255 136 0)',
        yAxisID: 'y1',
      },
      {
        data: [],
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

  private loadAllData() {
    this.dataService.getTotalTradeBalance().pipe(take(1))
      .subscribe({
        next: (data) => {
          console.log('Total Trade Balance data:', data);
          this.updateChartWithData(data, 0);
        },
      });

    this.dataService.getDirectInvestmentPctGdp().pipe(take(1))
      .subscribe({
        next: (data) => {
          console.log('FDI as prc from GDP data:', data);
          this.updateChartWithData(data, 1);
        },
      });

    this.dataService.governmentDebt().pipe(take(1))
      .subscribe({
        next: (data) => {
          console.log('Government deficit/surplus data:', data);
          this.updateChartWithData(data, 2);
        },
      });

    this.dataService.getIndustryProduction().pipe(take(1))
      .subscribe({
        next: (data) => {
          console.log('Production in industry data:', data);
          this.updateChartWithData(data, 3);
        },
      });

    this.dataService.govDeficitSurplus().pipe(take(1))
      .subscribe({
        next: (data) => {
          console.log('Public Deficit/Surplus data:', data);
          this.updateChartWithData(data, 4);
        },
      });


  }

  private filterDataByYearAndValues(data: IEstatDataset): Array<[string, number]> {
    const years = data.dimension.time.category.index as Record<string, number>;
    const values = data.value as Record<string, number>;

    return Object.entries(years)
      .filter(([year, index]) => Object.hasOwn(values, index))
      .map(([year, index]) => [year, values[index]]);
  }

  private updateChartWithData(data: IEstatDataset, dataIndex: number): void {
    const processedData = this.filterDataByYearAndValues(data);

    const labels = processedData.map(([year]) => year);
    const values = processedData.map(([_, value]) => value);

    if (dataIndex === 0) {
      this.chartData.labels = labels;
    }

    this.chartData.datasets[dataIndex].data = values;

    this.chart?.update();
  }
}
