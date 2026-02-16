import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseChartDirective } from 'ng2-charts';
import { Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ChartComponent } from './chart.component';
import { DataService } from '../data.service';
import { IEstatDataset } from 'src/app/interfaces/metricData';
import { getAvailableYearsWithValues, isMultiDimensional, processDataset } from 'src/app/shared/utils/dataset-processor';

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

  describe('UI Tests', () => {
    it('should display "Economic indicators" title', () => {
      fixture.detectChanges();

      const title = fixture.nativeElement.querySelector('h2');
      expect(title?.textContent?.trim()).toBe('Economic indicators');
    });

    it('should show canvas with data', () => {
      component['updateChartWithData'](mockValidData, 0);
      fixture.detectChanges();

      const canvasEl = fixture.nativeElement.querySelector('canvas');
      expect(canvasEl).toBeTruthy();
      expect(canvasEl.classList.contains('w-full')).toBe(true);
    });

    it('should set correct canvas attributes', () => {
      component['updateChartWithData'](mockValidData, 0);
      fixture.detectChanges();

      const canvasEl = fixture.nativeElement.querySelector('canvas');
      expect(canvasEl?.getAttribute('basechart')).not.toBeNull();
      expect(canvasEl?.getAttribute('type')).toBe('line');
    });

    it('should NOT display canvas when no data', () => {
      component['updateChartWithData'](mockEmptyData, 0);
      fixture.detectChanges();

      const canvasEl = fixture.nativeElement.querySelector('canvas');
      expect(canvasEl).toBeNull();
    });

    it('should display "No provided data yet" when no data', () => {
      component['updateChartWithData'](mockEmptyData, 0);
      fixture.detectChanges();

      const pEl = fixture.nativeElement.querySelectorAll('p');

      expect(pEl[0].textContent.trim()).toBe('No provided data yet');
      expect(pEl[1].textContent.trim()).toBe(
        'Data will appear here when available'
      );
    });
  });
  describe('dataset-processor utils', () => {

    describe('isMultiDimensional', () => {
      it('should return true for multi-dimensional datasets', () => {
        expect(isMultiDimensional([1, 1, 39, 1, 51])).toBe(true);
        expect(isMultiDimensional([2, 3, 4])).toBe(true);
      });

      it('should return false for simple datasets', () => {
        expect(isMultiDimensional([1])).toBe(false);
        expect(isMultiDimensional([1, 1])).toBe(false);
      });
    });

    describe('getAvailableYearsWithValues', () => {
      it('should return empty array for invalid dataset', () => {
        const result = getAvailableYearsWithValues(null as any);
        expect(result).toEqual([]);
      });

      it('should extract years with values from simple dataset', () => {
        const mockDataset: IEstatDataset = {
          value: { 0: 100, 1: 200, 2: 300 },
          dimension: {
            time: {
              category: {
                index: { '2020': 0, '2021': 1, '2022': 2 }
              }
            }
          },
          size: [3]
        } as any;

        const result = getAvailableYearsWithValues(mockDataset);

        expect(result.length).toBe(3);
        expect(result[0]).toEqual({ year: '2020', value: 100 });
        expect(result[1]).toEqual({ year: '2021', value: 200 });
        expect(result[2]).toEqual({ year: '2022', value: 300 });
      });
    });

    describe('processDataset', () => {
      it('should return hasData false for empty dataset', () => {
        const result = processDataset({} as any);
        expect(result.hasData).toBe(false);
      });

      it('should process simple dataset correctly', () => {
        const mockDataset: IEstatDataset = {
          value: { 0: 100, 1: 200 },
          dimension: {
            time: {
              category: {
                index: { '2020': 0, '2021': 1 }
              }
            }
          },
          size: [2]
        } as any;

        const result = processDataset(mockDataset);

        expect(result.hasData).toBe(true);
        expect(result.currentValue).toBe(200);
        expect(result.previousValue).toBe(100);
      });
    });
  });

});
