import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let pageChangeSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [NgxPaginationModule],
    });
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;

    pageChangeSpy = spyOn(component.pageChange, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onPageChange', () => {
  
    it('should not emit during component initialization', () => {
      expect(pageChangeSpy).not.toHaveBeenCalled();
    });

    it('should emit onPageChange event only onece per call', () => {
      component.onPageChange(1);

      expect(pageChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should show correct page number per call', () => {
      component.onPageChange(3);

      expect(pageChangeSpy).toHaveBeenCalledWith(3);
    });

    it('should not emit if page number is negative', () => {
      component.onPageChange(-3);

      expect(pageChangeSpy).not.toHaveBeenCalled();
    });

    it('should not emit if page number is null or undefined', () => {
      component.onPageChange(null as any);
      component.onPageChange(undefined as any);

      expect(pageChangeSpy).not.toHaveBeenCalled();
    });
  });

  
});
