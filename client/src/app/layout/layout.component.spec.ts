import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../core/header/header.component';
import { SelectMenuComponent } from '../shared/select-menu/select-menu.component';
import { FooterComponent } from '../core/footer/footer.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  let router: Router;
  let titleService: Title;
  let mockActivatedRoute: ActivatedRoute;
  let routerEventsSubject: Subject<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        SelectMenuComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatIconModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
              queryParams: {},
              data: {}
            },
            firstChild: null
          },
        },
      ],
    });

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;

    // configureTestingModule
    router = TestBed.inject(Router);
    titleService = TestBed.inject(Title);
    mockActivatedRoute = TestBed.inject(ActivatedRoute);

    // mock Router events
    routerEventsSubject = new Subject();
    spyOnProperty(router, 'events', 'get').and.returnValue(routerEventsSubject.asObservable());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Route Data Handling', () => {

    it('should set page title from route data', fakeAsync(() => {
      const titleSpy = spyOn(titleService, 'setTitle');
      mockActivatedRoute.snapshot.data = { title: 'Test Page' };

      fixture.detectChanges();

      routerEventsSubject.next(new NavigationEnd(1, '/test', '/test'));
      tick();

      expect(titleSpy).toHaveBeenCalledWith('Test Page');
    }));

    it('should hide header and footer on 404 page', fakeAsync(() => {
      mockActivatedRoute.snapshot.data = {
        showHeader: false,
        showFooter: false
      };

      component.ngOnInit();

      routerEventsSubject.next(new NavigationEnd(1, '/page-not-found', '/page-not-found'));
      tick();

      expect(component.showHeader).toBe(false);
      expect(component.showFooter).toBe(false);

      fixture.detectChanges();
      const header = fixture.nativeElement.querySelector('app-header');
      const footer = fixture.nativeElement.querySelector('app-footer');

      expect(header).toBeFalsy();
      expect(footer).toBeFalsy();
    }));
  });

  describe('UI Rendering', () => {
    it('should always render main element', () => {
      fixture.detectChanges();
      const main = fixture.nativeElement.querySelector('main');
      expect(main).toBeTruthy();
    });

    it('should always render router-outlet', () => {
      fixture.detectChanges();
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
