import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { SelectMenuComponent } from './shared/select-menu/select-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ErrorHandlingService } from './core/services/error-handling.service';
import { Subject } from 'rxjs';


describe('AppComponent', () => {
  const mockToastrService = jasmine.createSpyObj('ToastrService',
    ['success', 'error', 'info', 'warning']
  );
  const mockErrorHandlingService = jasmine.createSpyObj('ErrorHandlingService', [], {
    errorMessage$: new Subject<string>()
  });



  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent, LayoutComponent, HeaderComponent, FooterComponent, SelectMenuComponent],
    imports: [RouterTestingModule, MatIconModule, HttpClientTestingModule],
    providers: [
      { provide: ErrorHandlingService, useValue: mockErrorHandlingService },
      { provide: ToastrService, useValue: mockToastrService }
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'client'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('client');
  });


  it('should call displayError on ngOnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    spyOn<any>(app, 'displayError');
    fixture.detectChanges();

    expect(app['displayError']).toHaveBeenCalled();
  });


  it('should display error message when errorMessage$ emits', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const testErrorMessage = 'Test error message';

    fixture.detectChanges();

    mockErrorHandlingService.errorMessage$.next(testErrorMessage);


    expect(mockToastrService.error).toHaveBeenCalledWith(testErrorMessage, 'Error');
    expect(mockToastrService.error).toHaveBeenCalledTimes(1);

  })


  it('should not display error after ngOnDestroy', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const testErrorMessage = 'Should not display';
    
    fixture.detectChanges();

    app.ngOnDestroy();

    mockErrorHandlingService.errorMessage$.next(testErrorMessage);

    expect(mockToastrService.error).not.toHaveBeenCalled();

  })



});
