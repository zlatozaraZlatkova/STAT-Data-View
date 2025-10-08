import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RssNewsComponent } from './rss-news.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';

import { RssNewsService } from 'src/app/core/services/rss-news.service';
import { IRssNews } from 'src/app/interfaces/rssNews';


describe('RssNewsComponent', () => {
  let component: RssNewsComponent;
  let fixture: ComponentFixture<RssNewsComponent>;
  let rssNewsSubject: BehaviorSubject<IRssNews | null>;

   const mockRSS: IRssNews = {
      title: 'Default title',
      description: 'Default description',
      link: 'Default link',
      lastBuildDate: '01-10-2025',
      items: [{
        title: 'Current item',
        description: 'Current description',
        link: 'Current item link',
        pubDate: '09-09-2025'
      }]
    };

  beforeEach(() => {
    rssNewsSubject = new BehaviorSubject<IRssNews | null>(null);

    const mockService = {
      rssNews$: rssNewsSubject.asObservable(),
      getRssNews: () => of(null)
    };

    TestBed.configureTestingModule({
      declarations: [RssNewsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: RssNewsService, useValue: mockService }
      ]
    });

    fixture = TestBed.createComponent(RssNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "RSS News" page', () => {
    const router = TestBed.inject(Router);
    const routerSpy = spyOn(router, 'navigate');

    component.redirectTo();

    expect(routerSpy).toHaveBeenCalledWith(['/dashboard/rss-news']);
  });

  it('should navigate to input link', () => {
    const windowSpy = spyOn(window, 'open');

    component.openLink('www.inputlink.com');

    expect(windowSpy).toHaveBeenCalledWith('www.inputlink.com', '_blank');
  });

  it('should render rss news container when rssNews$ emits data', fakeAsync(() => {
   
    rssNewsSubject.next(mockRSS);
    
    fixture.detectChanges();
    tick();

    const containerEl = fixture.nativeElement.querySelector('[data-testid="rss-news"]');

    expect(containerEl).toBeTruthy();
  }));

  it('should not render rss news container when rssNews$ emits null', fakeAsync(() => {
    rssNewsSubject.next(null);

    fixture.detectChanges();
    tick();

    const containerEl = fixture.nativeElement.querySelector('[data-testid="rss-news"]');

    expect(containerEl).toBeFalsy();
  }));

  it('should render empty container when rssNews$ emits null', fakeAsync(() => {
    rssNewsSubject.next(null);
    fixture.detectChanges();
    tick();

    const noDataEl = fixture.nativeElement.querySelector('[data-testid="no-data"]');

    expect(noDataEl).toBeTruthy();
    expect(noDataEl.textContent).toContain('No RSS data loaded yet');
  }));

});