import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { DataService } from '../data.service';
import { IEstatDataset } from 'src/app/interfaces/metricData';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let populationSubject: BehaviorSubject<IEstatDataset | null>;
  let gdpSubject: BehaviorSubject<IEstatDataset | null>;
  let employmentSubject: BehaviorSubject<IEstatDataset | null>;
  let inflationSubject: BehaviorSubject<IEstatDataset | null>;

  beforeEach(() => {

    populationSubject = new BehaviorSubject<IEstatDataset | null>(null);
    gdpSubject = new BehaviorSubject<IEstatDataset | null>(null);
    employmentSubject = new BehaviorSubject<IEstatDataset | null>(null);
    inflationSubject = new BehaviorSubject<IEstatDataset | null>(null);

    const mockDataService = {
      population$: populationSubject.asObservable(),
      gdp$: gdpSubject.asObservable(),
      employment$: employmentSubject.asObservable(),
      inflation$: inflationSubject.asObservable()
    };

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: DataService, useValue: mockDataService }
      ]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render container when data is available', () => {

    const mockDataset = {} as IEstatDataset;

    populationSubject.next(mockDataset);
    gdpSubject.next(mockDataset);
    employmentSubject.next(mockDataset);
    inflationSubject.next(mockDataset);

    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('[data-testid="metric-data"]');
    expect(container).toBeTruthy();
  });

  it('should NOT render container when data is null', () => {
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('[data-testid="metric-data"]');
    expect(container).toBeNull();
  });

  it('should close sidebar when toggled form open', () => {
    component.onToggleSidebar();
    expect(component.isSidebarOpen()).toBe(false);
  })

  it('should open sidebar when toggled from closed', () => {
    component.isSidebarOpen.set(false);
    component.onToggleSidebar();
    expect(component.isSidebarOpen()).toBe(true);
  });

  it('should read signal value', () => {
    expect(component.isSidebarOpen()).toBe(true);
  });

  it('should update signal value', () => {
    component.isSidebarOpen.set(false);
    expect(component.isSidebarOpen()).toBe(false);
  });

  it('should update signal with function', () => {
    component.isSidebarOpen.update(value => !value);
    expect(component.isSidebarOpen()).toBe(false);
  });

});