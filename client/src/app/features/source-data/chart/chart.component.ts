import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IEstatDataset } from 'src/app/interfaces/metricData';
import { DataService } from '../data.service';
import { ApiService } from 'src/app/api.service';
import { Subject, takeUntil, take } from 'rxjs';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public chartType: ChartType = 'line';
  private destroy$ = new Subject<void>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.initializeData();
    this.setupDataSubscriptions();
  }


  private initializeData(): void {
    this.dataService.getTotalTradeBalance().pipe(take(1)).subscribe();
    this.dataService.getDirectInvestmentPctGdp().pipe(take(1)).subscribe();
    this.dataService.governmentDebt().pipe(take(1)).subscribe();
    this.dataService.getIndustryProduction().pipe(take(1)).subscribe();
    this.dataService.govDeficitSurplus().pipe(take(1)).subscribe();
  }

  private setupDataSubscriptions(): void {

    this.dataService.tradeBalance$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      if (data) {
        // console.log('Chart: Trade Balance updated', data);
        this.updateChartWithData(data, 0);
      }
    });

    this.dataService.foreignDirectInvestment$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      if (data) {
        //console.log('Chart: FDI updated', data);
        this.updateChartWithData(data, 1);
      }
    });

    this.dataService.governmentDebt$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      if (data) {
        //console.log('Chart: Government Debt updated', data);
        this.updateChartWithData(data, 2);
      }
    });

    this.dataService.industryProduction$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      if (data) {
        //console.log('Chart: Industry Production updated', data);
        this.updateChartWithData(data, 3);
      }
    });

    this.dataService.govDeficitSurplus$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      if (data) {
        // console.log('Chart: Deficit/Surplus updated', data);
        this.updateChartWithData(data, 4);
      }
    });
  }

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

  private hasValidData(data: IEstatDataset): boolean {
    return data && data.value && Object.keys(data.value).length > 0;
  }

  private filterDataByYearAndValues(data: IEstatDataset): Array<[string, number | null]> {
    if (!this.hasValidData(data)) {
      return [];
    }

    const years = data.dimension.time.category.index as Record<string, number>;
    const values = data.value as Record<string, number>;

    const startYear = 2014;
    const endYear = 2024;
    const result: Array<[string, number | null]> = [];

    for (let year = startYear; year <= endYear; year++) {
      const yearKey = String(year);
      const valueIndex = years[yearKey];
      const actualValue = values[valueIndex];

      result.push([yearKey, actualValue ?? null]);
    }

    return result;
  }

  private updateChartWithData(data: IEstatDataset, dataIndex: number): void {
    if (!this.hasValidData(data)) {
      // console.log(`Chart: No data available for dataset ${dataIndex}`);
      this.chartData.datasets[dataIndex].data = [];
      this.chart?.update();
      return;
    }

    const processedData = this.filterDataByYearAndValues(data);
    const labels = processedData.map(([year]) => year);
    const values = processedData.map(([, value]) => value);

    // labels (2014-2024)
    if (dataIndex === 0) {
      this.chartData.labels = labels;
    }

    this.chartData.datasets[dataIndex].data = values;
    this.chart?.update();
  }


  hasChartData(): boolean {
    return this.chartData &&
      this.chartData.datasets &&
      this.chartData.datasets.length > 0 &&
      this.chartData.datasets.some(dataset =>
        dataset.data && dataset.data.length > 0
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}