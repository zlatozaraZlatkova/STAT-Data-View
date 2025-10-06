import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricCardComponent } from './metric-card.component';
import { ExtractWordPipe } from 'src/app/shared/pipes/extract-word.pipe';
import { MatIconModule } from '@angular/material/icon';
import { IEstatDataset } from 'src/app/interfaces/metricData';
import { MatTooltipModule } from '@angular/material/tooltip';

const MOCK_METRIC_DATA = {
  dimension: {
    time: { category: { index: { 0: 0, 1: 1 } } },
    unit: { category: { index: { THS_PER: 0 } } }
  },
  value: { 0: 1000, 1: 2000 }
} as unknown as IEstatDataset

describe('MetricCardComponent', () => {
  let component: MetricCardComponent;
  let fixture: ComponentFixture<MetricCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetricCardComponent, ExtractWordPipe],
      imports: [MatIconModule, MatTooltipModule]
    });
    fixture = TestBed.createComponent(MetricCardComponent);
    component = fixture.componentInstance;

    component.data = MOCK_METRIC_DATA;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
