import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseChartDirective } from 'ng2-charts';
import { Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ChartComponent } from './chart.component';
import { DataService } from '../data.service';
import { IEstatDataset } from 'src/app/interfaces/metricData';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  let mockChart: jasmine.SpyObj<BaseChartDirective>;
  let tradeBalance$: Subject<IEstatDataset | null>;

  const mockValidData: IEstatDataset = {
    dimension: {
      time: { category: { index: { '2014': 0, '2015': 1 } } },
    },
    value: { '0': 1000, '1': 1500 },
  } as any;

  const mockEmptyData: IEstatDataset = {
    dimension: { time: { category: { index: {} } } },
    value: {},
  } as any;

  beforeEach(() => {
    tradeBalance$ = new Subject<IEstatDataset | null>();

    const mockDataService = jasmine.createSpyObj('DataService', [], {
      tradeBalance$: new Subject(),
      foreignDirectInvestment$: new Subject(),
      governmentDebt$: new Subject(),
      industryProduction$: new Subject(),
      govDeficitSurplus$: new Subject(),
    });

    TestBed.configureTestingModule({
      declarations: [ChartComponent, BaseChartDirective],
      providers: [{ provide: DataService, useValue: mockDataService }],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;

    mockChart = jasmine.createSpyObj('BaseChartDirective', ['update']);
    component.chart = mockChart;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Branch Coverage', () => {
    it('should validate data', () => {
      expect(component['hasValidData'](mockValidData)).toBe(true);
      expect(component['hasValidData'](mockEmptyData)).toBe(false);
    });

    it('should update chart with valid data', () => {
      component['updateChartWithData'](mockValidData, 0);

      expect(component.chartData.datasets[0].data.length).toBeGreaterThan(0);
      expect(mockChart.update).toHaveBeenCalled();
    });

    it('should clear chart with empty data', () => {
      component['updateChartWithData'](mockEmptyData, 0);

      expect(component.chartData.datasets[0].data).toEqual([]);
      expect(mockChart.update).toHaveBeenCalled();
    });

    it('should update labels only for first dataset', () => {
      component.chartData.labels = [];

      component['updateChartWithData'](mockValidData, 0);

      expect(component.chartData.labels?.length).toBeGreaterThan(0);
    });

    it('should NOT update labels for other datasets', () => {
      component.chartData.labels = ['existing'];

      component['updateChartWithData'](mockValidData, 1);

      expect(component.chartData.labels).toEqual(['existing']);
    });

    it('should return true when has data', () => {
      component['updateChartWithData'](mockValidData, 0);

      expect(component.hasChartData()).toBe(true);
    });

    it('should return false when empty', () => {
      component['updateChartWithData'](mockEmptyData, 0);

      expect(component.hasChartData()).toBe(false);
    });

    it('should cleanup on destroy', () => {
      spyOn(component['destroy$'], 'next');
      spyOn(component['destroy$'], 'complete');

      component.ngOnDestroy();

      expect(component['destroy$'].next).toHaveBeenCalled();
      expect(component['destroy$'].complete).toHaveBeenCalled();
    });
  });
  
});
