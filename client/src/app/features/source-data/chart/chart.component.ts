import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DataService } from '../data.service';
import { combineLatest, filter, map, Observable, take } from 'rxjs';
import { IEstatDataset } from 'src/app/interfaces/metricData';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public chartType: ChartType = 'line';

  public chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label:
          'International trade, by reporting country, total product - annual data, % of GDP',
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        yAxisID: 'y',
      },
      {
        data: [],
        label: 'Direct investment liabilities (flows) - annual data, % of GDP',
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        yAxisID: 'y1',
      },
    ],
  };

  public chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { position: 'left', title: { display: true, text: 'Total Trade' } },
      y1: {
        position: 'right',
        title: { display: true, text: 'DFI (% GDP)' },
        grid: { drawOnChartArea: false },
      },
    },
  };

  constructor(private dataService: DataService) {}

  chartData$: Observable<IEstatDataset[] | null> = combineLatest([
    this.dataService.tradeBalance$.pipe(filter((data): data is IEstatDataset => data !== null)),
    this.dataService.foreignDirectInvestment$.pipe(filter((data): data is IEstatDataset => data !== null)),
  ]).pipe(
    map(([tradeBalanceData, fdiPrcGdpData]) => [
      tradeBalanceData,
      fdiPrcGdpData,
    ])
  );

  ngOnInit(): void {
    this.loadAllData();
  }

  private loadAllData() {
    this.dataService.getTotalTradeBalance().pipe(take(1)).subscribe({
        next: (data) => { console.log('Trade Balance data:', data); },
      });

    this.dataService.getDirectInvestmentPctGdp().pipe(take(1)).subscribe({
        next: (data) => { console.log('FDI % GDP(annual) data:', data); },
      });
  }
}
