import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    value: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6 },
    dimension: {
      time: {
        category: {
          index: { 
            '2019': 0, 
            '2020': 1, 
            '2021': 2, 
            '2022': 3, 
            '2023': 4, 
            '2024': 5 
          },
        },
      },
    },
    size: [6],
    updated: '2024-02-16T10:00:00Z'
  } as unknown as IEstatDataset;

  const mockDatasetWithPositiveChange = {
    value: { 0: 2, 1: 3, 2: 4, 3: 5, 4: 6, 5: 8 },
    dimension: {
      time: {
        category: {
          index: { 
            '2019': 0, 
            '2020': 1, 
            '2021': 2, 
            '2022': 3, 
            '2023': 4, 
            '2024': 5 
          },
        },
      },
    },
    size: [6]
  } as unknown as IEstatDataset;

  const mockDatasetWithNegativeChange = {
    value: { 0: 8, 1: 7, 2: 6, 3: 5, 4: 4, 5: 2 },
    dimension: {
      time: {
        category: {
          index: { 
            '2019': 0, 
            '2020': 1, 
            '2021': 2, 
            '2022': 3, 
            '2023': 4, 
            '2024': 5 
          },
        },
      },
    },
    size: [6]
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

 
  it('should create 4 indicators when all data is valid', (done) => {
    component.ngOnInit();

    component.indicators$.subscribe((result) => {
      expect(result.length).toBe(4);
      expect(result[0].label).toBe('Nominal Income Growth');
      done();
    });

    nominalSubject.next(mockValidDataset);
    realSubject.next(mockValidDataset);
    savingSubject.next(mockValidDataset);
    investmentSubject.next(mockValidDataset);
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


  it('should format positive change with green class', (done) => {
    component.ngOnInit();

    component.indicators$.subscribe((result) => {
      expect(result[0].change).toContain('+');
      expect(result[0].changeClass).toBe('text-green-600');
      expect(result[0].yoyChange).toContain('+');
      expect(result[0].yoyClass).toBe('text-green-600');
      done();
    });

    nominalSubject.next(mockDatasetWithPositiveChange);
    realSubject.next(mockDatasetWithPositiveChange);
    savingSubject.next(mockDatasetWithPositiveChange);
    investmentSubject.next(mockDatasetWithPositiveChange);
  });

  
  it('should format negative change with red class', (done) => {
    component.ngOnInit();

    component.indicators$.subscribe((result) => {
      expect(result[0].change).not.toContain('+');
      expect(result[0].changeClass).toBe('text-red-600');
      expect(result[0].yoyClass).toBe('text-red-600');
      done();
    });

    nominalSubject.next(mockDatasetWithNegativeChange);
    realSubject.next(mockDatasetWithNegativeChange);
    savingSubject.next(mockDatasetWithNegativeChange);
    investmentSubject.next(mockDatasetWithNegativeChange);
  });


  it('should filter out datasets with less than 6 values', (done) => {
    const insufficientData = {
      value: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5 },
      dimension: {
        time: {
          category: {
            index: { '2020': 0, '2021': 1, '2022': 2, '2023': 3, '2024': 4 },
          },
        },
      },
      size: [5]
    } as unknown as IEstatDataset;

    component.ngOnInit();

    component.indicators$.subscribe((result) => {
      expect(result.length).toBe(0);
      done();
    });

    nominalSubject.next(insufficientData);
    realSubject.next(insufficientData);
    savingSubject.next(insufficientData);
    investmentSubject.next(insufficientData);
  });


  it('should return formatted date when data exists', (done) => {
    component.ngOnInit();

    component.lastUpdated$.subscribe((result) => {
      expect(result).toContain('2024');
      done();
    });

    nominalSubject.next(mockValidDataset);
  });


  it('should return empty string when no data', (done) => {
    component.ngOnInit();

    component.lastUpdated$.subscribe((result) => {
      expect(result).toBe('');
      done();
    });

    nominalSubject.next(null);
  });
});