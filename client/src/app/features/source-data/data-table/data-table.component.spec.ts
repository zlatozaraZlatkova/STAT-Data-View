import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { DataTableComponent } from './data-table.component';
import { DataService } from '../data.service';
import { IEstatDataset } from 'src/app/interfaces/metricData';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;

  let nominalSubject: Subject<IEstatDataset | null>;
  let realSubject: Subject<IEstatDataset | null>;
  let savingSubject: Subject<IEstatDataset | null>;
  let investmentSubject: Subject<IEstatDataset | null>;

  const mockInvalidDataset = {
    value: {},
    dimension: {
      time: {
        category: {
          index: {},
        },
      },
    },
  } as IEstatDataset;

  const mockValidDataset = {
    value: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5 },
    dimension: {
      time: {
        category: {
          index: { '2023': 0, '2024': 1 },
        },
      },
    },
  } as unknown as IEstatDataset;

  beforeEach(() => {
    nominalSubject = new Subject();
    realSubject = new Subject();
    savingSubject = new Subject();
    investmentSubject = new Subject();

    mockDataService = jasmine.createSpyObj('DataService', [], {
      nominalCapitaIncomeGrowth$: nominalSubject.asObservable(),
      realPerCapitaIncomeGrowth$: realSubject.asObservable(),
      savingRate$: savingSubject.asObservable(),
      investmentRate$: investmentSubject.asObservable(),
    });

    TestBed.configureTestingModule({
      declarations: [DataTableComponent],
      providers: [{ provide: DataService, useValue: mockDataService }],
    });

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should return false if dataset is null', () => {
    const result = component['isValidDataset'](mockInvalidDataset);
    expect(result).toBe(false);
  });

  it('should return false if dataset value is null', () => {
    const result = component['isValidDataset'](mockInvalidDataset);
    expect(result).toBe(false);
  });

  it('should return false if dataset has less than 6 values', () => {
    const result = component['isValidDataset'](mockValidDataset);
    expect(result).toBe(false);
  });

  it('should return true if dataset has 6 values', () => {
    const updatedMockDataset = {
      ...mockValidDataset,
      value: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6 },
    };
    const result = component['isValidDataset'](updatedMockDataset);
    expect(result).toBe(true);
  });

  it('should format indicator with positive change', () => {
    const result = component['formatIndicator']('Test Label', mockValidDataset);

    expect(result.label).toBe('Test Label');
    expect(result.changeClass).toBe('text-green-600');
    expect(result.change).toContain('+');
  });

  it('should format indicator with negative change', () => {
    const updatedMockDataset = {
      ...mockValidDataset,
      value: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 7, 5: 5 }
    };
    const result = component['formatIndicator']('Test Label', updatedMockDataset);

    expect(result.changeClass).toBe('text-red-600');
    expect(result.change).not.toContain('+');
  });

  it('should format indicator with positive 5 year change', () => {
    const updatedMockDataset = {
      ...mockValidDataset,
      value: { 0: 2, 1: 3, 2: 4, 3: 5, 4: 6, 5: 8 },
    };

    const result = component['formatIndicator']('Test', updatedMockDataset);

    expect(result.yoyClass).toBe('text-green-600');
  });

  it('should format indicator with negative 5 year change', () => {
    const updatedMockDataset = {
      ...mockValidDataset,
      value: { 0: 8, 1: 7, 2: 6, 3: 5, 4: 4, 5: 3 },
    };

    const result = component['formatIndicator']('Test', updatedMockDataset);

    expect(result.yoyClass).toBe('text-red-600');
  });

  it('should extract current value correctly', () => {
    const updatedMockDataset = {
      ...mockValidDataset,
      value: { 0: 10, 1: 20, 2: 30, 3: 40, 4: 50, 5: 60 },
    };

    const result = component['extractValues'](updatedMockDataset);

    expect(result.current).toBe(60);
  });

  it('should extract previous value correctly', () => {
    const updatedMockDataset = {
      ...mockValidDataset,
      value: { 0: 10, 1: 20, 2: 30, 3: 40, 4: 50, 5: 60 },
    };

    const result = component['extractValues'](updatedMockDataset);

    expect(result.previous).toBe(50);
  });

  it('should extract five year ago value correctly', () => {
    const updatedMockDataset = {
      ...mockValidDataset,
      value: { 0: 10, 1: 20, 2: 30, 3: 40, 4: 50, 5: 60 },
    };

    const result = component['extractValues'](updatedMockDataset);

    expect(result.fiveYearAgo).toBe(10);
  });

  it('should return empty string if dataset is null', () => {
    const result = component['extractLastPeriod'](mockInvalidDataset);
    expect(result).toBe('');
  });

  it('should return empty string if dimension is missing', () => {
    const result = component['extractLastPeriod'](mockInvalidDataset);
    expect(result).toBe('');
  });

  it('should extract last period from dataset', () => {
    const dataset = {
      dimension: {
        time: {
          category: {
            index: {
              '2021': 0,
              '2022': 1,
              '2023': 2,
              '2024': 3,
            },
          },
        },
      },
    } as unknown as IEstatDataset;

    const result = component['extractLastPeriod'](dataset);

    expect(result).toBe('2024');
  });

  it('should create 4 indicators when all data is valid', (done) => {
    const updatedMockDataset = {
      ...mockValidDataset,
      value: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6 }
    };

    component.ngOnInit();

    component.indicators$.subscribe((result) => {
      expect(result.length).toBe(4);
      expect(result[0].label).toBe('Nominal Income Growth');
      expect(result[1].label).toBe('Real Income Growth');
      expect(result[2].label).toBe('Saving Rate');
      expect(result[3].label).toBe('Investment Rate');
      done();
    });

    nominalSubject.next(updatedMockDataset);
    realSubject.next(updatedMockDataset);
    savingSubject.next(updatedMockDataset);
    investmentSubject.next(updatedMockDataset);
  });

  it('should return empty array when datasets are invalid', (done) => {
    component.ngOnInit();

    component.indicators$.subscribe((result) => {
      expect(result.length).toBe(0);
      done();
    });

    nominalSubject.next(mockInvalidDataset);
    realSubject.next(mockInvalidDataset);
    savingSubject.next(mockInvalidDataset);
    investmentSubject.next(mockInvalidDataset);
  });


});
