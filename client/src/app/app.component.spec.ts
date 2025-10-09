import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { SelectMenuComponent } from './shared/select-menu/select-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ErrorHandlingService } from './core/services/error-handling.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';


describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockErrorHandlingService: any;

  beforeEach(() => {
    mockToastrService = jasmine.createSpyObj('ToastrService',
      ['success', 'error', 'info', 'warning']
    );

    mockErrorHandlingService = {
      errorMessage$: new Subject<string>()
    };

    TestBed.configureTestingModule({
      declarations: [AppComponent, LayoutComponent, HeaderComponent, FooterComponent, SelectMenuComponent],
      imports: [RouterTestingModule, MatIconModule, HttpClientTestingModule],
      providers: [
        { provide: ErrorHandlingService, useValue: mockErrorHandlingService },
        { provide: ToastrService, useValue: mockToastrService }
      ]
    });


    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    mockErrorHandlingService.errorMessage$.complete();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'client'`, () => {
    expect(component.title).toEqual('client');
  });

  it('should call displayError on ngOnInit', () => {
    spyOn<any>(component, 'displayError');
    fixture.detectChanges();

    expect(component['displayError']).toHaveBeenCalled();
  });


  it('should display error message when errorMessage$ emits', () => {
    const testErrorMessage = 'Test error message';

    fixture.detectChanges();
    mockErrorHandlingService.errorMessage$.next(testErrorMessage);

    expect(mockToastrService.error).toHaveBeenCalledWith(testErrorMessage, 'Error');
    expect(mockToastrService.error).toHaveBeenCalledTimes(1);
  });

  it('should display error for each emission from errorMessage$', () => {
    fixture.detectChanges();

    mockErrorHandlingService.errorMessage$.next('Error 1');
    mockErrorHandlingService.errorMessage$.next('Error 2');
    mockErrorHandlingService.errorMessage$.next('Error 3');

    expect(mockToastrService.error).toHaveBeenCalledTimes(3);
  });

  it('should only call error method, not success/info/warning', () => {
    fixture.detectChanges();

    mockErrorHandlingService.errorMessage$.next('Test error');

    expect(mockToastrService.success).not.toHaveBeenCalled();
    expect(mockToastrService.info).not.toHaveBeenCalled();
    expect(mockToastrService.warning).not.toHaveBeenCalled();
  });

  it('should not display error after ngOnDestroy', () => {
    fixture.detectChanges();

    component.ngOnDestroy();

    mockErrorHandlingService.errorMessage$.next('Should not display');

    expect(mockToastrService.error).not.toHaveBeenCalled();
  });

  it('should still call toastr.error even with empty string', () => {
    fixture.detectChanges();

    mockErrorHandlingService.errorMessage$.next('');

    expect(mockToastrService.error).toHaveBeenCalledWith('', 'Error');
  });

});