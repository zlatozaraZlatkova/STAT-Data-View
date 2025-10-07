import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../core/header/header.component';
import { SelectMenuComponent } from '../shared/select-menu/select-menu.component';
import { FooterComponent } from '../core/footer/footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        SelectMenuComponent,
      ],
      imports: [RouterTestingModule, HttpClientTestingModule, MatIconModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {}, queryParams: {} },
            paramMap: of(),
            queryParamMap: of(),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('UI Rendering', () => {

    it('should always render main element', () => {
      fixture.detectChanges();

      const main = fixture.nativeElement.querySelector('main');
      expect(main).toBeTruthy();
    });
    

    it('should always render router-outlet', () => {
      const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
      
      expect(routerOutlet).toBeTruthy();
    });

    it('should render default layout with all components', () => {
      component.showHeader = true;
      component.showFooter = true;

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('app-header')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('main')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('app-footer')).toBeTruthy();
    });
  });

  describe('Header Visibility', () => {
    it('should show header when showHeader is true', () => {
      component.showHeader = true;
      fixture.detectChanges();

      const header = fixture.nativeElement.querySelector('app-header');
      expect(header).toBeTruthy();
    });

    it('should hide header when showHeader is false', () => {
      component.showHeader = false;

      fixture.detectChanges();

      const header = fixture.nativeElement.querySelector('app-header');
      expect(header).toBeFalsy();
    });
  });

  describe('Footer Visibility', () => {
    it('should show footer when showFooter is true', () => {
      component.showFooter = true;

      fixture.detectChanges();

      const footer = fixture.nativeElement.querySelector('app-footer');
      expect(footer).toBeTruthy();
    });

    it('should hide footer when showFooter is false', () => {
      component.showFooter = false;

      fixture.detectChanges();

      const footer = fixture.nativeElement.querySelector('app-footer');
      expect(footer).toBeFalsy();
    });

  });

});
