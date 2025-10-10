import { IEstatDataset } from "src/app/interfaces/metricData";
import { MetricCardComponent } from "./metric-card.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ExtractWordPipe } from "src/app/shared/pipes/extract-word.pipe";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CommonModule } from "@angular/common";


describe('MetricCardComponent - Branch Coverage', () => {
  let component: MetricCardComponent;
  let fixture: ComponentFixture<MetricCardComponent>;
  let metricCardElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetricCardComponent, ExtractWordPipe],
      imports: [MatIconModule, MatTooltipModule, CommonModule]
    });
    fixture = TestBed.createComponent(MetricCardComponent);
    component = fixture.componentInstance;
    metricCardElement = fixture.nativeElement;
  });


  it('should return early when value is empty', () => {
    component.data = {
      dimension: { time: { category: { index: { 0: 0 } } } },
      value: {}
    } as unknown as IEstatDataset;
    
    fixture.detectChanges();
    expect(component.currentValues).toBe(0);
  });

 
  it('should process data when value exists', () => {
    component.data = {
      dimension: { time: { category: { index: { 0: 0 } } } },
      value: { 0: 1000 }
    } as unknown as IEstatDataset;
    
    fixture.detectChanges();
    expect(component.currentValues).toBe(1000);
  });


  it('should calculate previousYearValue when 2+ years exist', () => {
    component.data = {
      dimension: { time: { category: { index: { 0: 0, 1: 1 } } } },
      value: { 0: 1000, 1: 2000 }
    } as unknown as IEstatDataset;
    
    fixture.detectChanges();
    expect(component.previousYearValue).toBe(1000);
  });


  it('should not calculate previousYearValue when only 1 year', () => {
    component.data = {
      dimension: { time: { category: { index: { 0: 0 } } } },
      value: { 0: 1000 }
    } as unknown as IEstatDataset;
    
    fixture.detectChanges();
    expect(component.previousYearValue).toBe(0);
  });


  it('should calculate percentage when both values exist', () => {
    component.data = {
      dimension: { time: { category: { index: { 0: 0, 1: 1 } } } },
      value: { 0: 1000, 1: 2000 }
    } as unknown as IEstatDataset;
    
    fixture.detectChanges();
    expect(component.percentageDifference).toBe(100);
  });


  it('should format with unit when unitCategory.index exists', () => {
    component.currentValues = 5000;
    component.data = {
      dimension: { unit: { category: { index: { THS_PER: 0 } } } }
    } as unknown as IEstatDataset;
    
    expect(component.getFormattedValue()).toBe('5M');
  });


  it('should format as plain number when no unit', () => {
    component.currentValues = 5000;
    component.data = {
      dimension: {}
    } as unknown as IEstatDataset;
    
    expect(component.getFormattedValue()).toBe('5,000');
  });


  it('should handle THS_PER unit', () => {
    component.currentValues = 5000;
    component.data = {
      dimension: { unit: { category: { index: { THS_PER: 0 } } } }
    } as unknown as IEstatDataset;

    expect(component.getFormattedValue()).toBe('5M');
  });

  it('should handle CLV10_MEUR unit', () => {
    component.currentValues = 5000;
    component.data = {
      dimension: { unit: { category: { index: { CLV10_MEUR: 0 } } } }
    } as unknown as IEstatDataset;

    expect(component.getFormattedValue()).toBe('5B');
  });

  it('should handle RCH_A_AVG unit', () => {
    component.currentValues = 25.5;

    component.data = {
      dimension: { unit: { category: { index: { RCH_A_AVG: 0 } } } }
    } as unknown as IEstatDataset;

    expect(component.getFormattedValue()).toBe('25.5%');
  });


  it('should handle unknown unit code', () => {
    component.currentValues = 5000;

    component.data = {
      dimension: { unit: { category: { index: { UNKNOWN: 0 } } } }
    } as unknown as IEstatDataset;

    expect(component.getFormattedValue()).toBe('5,000');
  });

  
  it('should show green styling for positive percentage', () => {
    component.data = {
      dimension: { time: { category: { index: { 0: 0, 1: 1 } } } },
      value: { 0: 1000, 1: 2000 }
    } as unknown as IEstatDataset;
    
    fixture.detectChanges();
    expect(metricCardElement.querySelector('.bg-green-50')).toBeTruthy();
  });

  it('should show red styling for negative percentage', () => {
    component.data = {
      dimension: { time: { category: { index: { 0: 0, 1: 1 } } } },
      value: { 0: 2000, 1: 1500 }
    } as unknown as IEstatDataset;
    
    fixture.detectChanges();
    expect(metricCardElement.querySelector('.bg-red-50')).toBeTruthy();
  });

  it('should show "No data available" when empty', () => {
    component.data = {
      dimension: { time: { category: { index: {} } } },
      value: {}
    } as unknown as IEstatDataset;
    
    fixture.detectChanges();
    expect(metricCardElement.textContent).toContain('No data available');
  });
});