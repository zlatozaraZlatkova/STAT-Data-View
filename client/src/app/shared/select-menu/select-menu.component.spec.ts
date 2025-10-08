import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SelectMenuComponent } from './select-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from 'src/app/api.service';
import { BehaviorSubject } from 'rxjs';

describe('SelectMenuComponent', () => {
  let component: SelectMenuComponent;
  let fixture: ComponentFixture<SelectMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectMenuComponent],
      imports: [HttpClientTestingModule],
      providers: [ApiService]

    });
    fixture = TestBed.createComponent(SelectMenuComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setSelectedCountry', () => {
    it('should call apiService.setSelectedCountry with selected value', () => {
      const event = { target: { value: 'AT' } } as unknown as Event;
      const apiService = TestBed.inject(ApiService);
      const spy = spyOn(apiService, 'setSelectedCountry');

      component.onCountryChange(event);

      expect(spy).toHaveBeenCalledWith('AT');
    });

    it('should not call apiService.setSelectedCountry if value is empty', () => {
      const event = { target: { value: '' } } as unknown as Event;
      const apiService = TestBed.inject(ApiService);
      const spy = spyOn(apiService, 'setSelectedCountry');

      component.onCountryChange(event);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not call apiService.setSelectedCountry if value is null', () => {
      const event = { target: { value: null } } as unknown as Event;
      const apiService = TestBed.inject(ApiService);
      const spy = spyOn(apiService, 'setSelectedCountry');

      component.onCountryChange(event);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not call apiService.setSelectedCountry if value is undefined', () => {
      const event = { target: { value: undefined } } as unknown as Event;
      const apiService = TestBed.inject(ApiService);
      const spy = spyOn(apiService, 'setSelectedCountry');

      component.onCountryChange(event);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should render a select element', () => {
      const selectEl = fixture.nativeElement.querySelector('[data-testid="select"]');
      expect(selectEl).toBeTruthy();
    });

    it('should call apiService.setSelectedCountry when a country is selected from the dropdown', () => {
      const apiService = TestBed.inject(ApiService);
      const spy = spyOn(apiService, 'setSelectedCountry');
      const selectEl = fixture.nativeElement.querySelector('[data-testid="select"]');

      selectEl.value = 'DE';
      selectEl.dispatchEvent(new Event('change'));

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith('DE');

    })


    it('should update select value when selectedCountry$ emits', fakeAsync(() => {
      const apiService = TestBed.inject(ApiService);
      const subject = new BehaviorSubject<string>('AT');
      (apiService as any).selectedCountry$ = subject.asObservable();

      fixture.detectChanges();
      tick();


      subject.next('LU');
      fixture.detectChanges();
      tick();

      
      const selectedOption = fixture.nativeElement.querySelector('option[value="LU"]');
   
      expect(selectedOption.textContent).toBe('Luxembourg');
  
    }));

  })

});
