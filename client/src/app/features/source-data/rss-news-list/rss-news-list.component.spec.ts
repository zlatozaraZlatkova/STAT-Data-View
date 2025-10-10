import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RssNewsListComponent } from './rss-news-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { IRssNews, IRssNewsItem } from 'src/app/interfaces/rssNews';
import { RssNewsService } from 'src/app/core/services/rss-news.service';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchBoxComponent } from 'src/app/shared/search-box/search-box.component';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RssNewsListComponent', () => {
  let component: RssNewsListComponent;
  let fixture: ComponentFixture<RssNewsListComponent>;

  let mockRssNewsService: Partial<jasmine.SpyObj<RssNewsService>>;
  let rssNews$: Subject<IRssNews | null>;

  const mockRssItemValidData = {
    title: 'Rss news title',
    description: 'Rss news description',
    link: 'www.rss-news-link.com',
    pubDate: '10-10-2025',
  } as unknown as IRssNewsItem;

  const mockRss: IRssNews = {
    title: 'Feed title',
    description: 'desc',
    link: 'www.example.com',
    lastBuildDate: '2025-10-10',
    items: [mockRssItemValidData],
  };

  const queryParams$ = new Subject<any>();

  beforeEach(() => {
    rssNews$ = new Subject<IRssNews | null>();

    mockRssNewsService = {
      rssNews$: rssNews$.asObservable(),
      getRssNews: jasmine.createSpy('getRssNews').and.returnValue(of([])),
    };

    TestBed.configureTestingModule({
      declarations: [RssNewsListComponent, PaginationComponent, SearchBoxComponent, SearchPipe],
      imports: [HttpClientTestingModule, NgxPaginationModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: queryParams$.asObservable(),
            snapshot: { queryParams: {} },
          },
        },
        { provide: RssNewsService, useValue: mockRssNewsService },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(RssNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getRssNews() on init', () => {
    expect(mockRssNewsService.getRssNews).toHaveBeenCalled();
  });


  it('should cleanup on destroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });

  it('should show container when rssNews$ emits data', () => {
    rssNews$.next(mockRss);
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector(
      '[data-testid="rss-container"]'
    );
    expect(container).toBeTruthy();
  });

  it('should hide container when rssNews$ emits null', () => {
    rssNews$.next(null);
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector(
      '[data-testid="rss-container"]'
    );
    expect(container).toBeNull();
  });

  it('should update searchText and reset currentPage when onSearchChange is called', () => {
    component.currentPage = 5;
    const searchValue = 'test search';

    component.onSearchChange(searchValue);

    expect(component.searchText).toBe(searchValue);
    expect(component.currentPage).toBe(1);
  });

  it('should set currentPage to 3 when queryParams.page is 3', () => {
    queryParams$.next({ page: 3 });
    expect(component.currentPage).toBe(3);
  });

  it('should default currentPage to 1 when queryParams.page is negative', () => {
    queryParams$.next({ page: -1 });
    expect(component.currentPage).toBe(1);
  });

  it('should default currentPage to 1 when queryParams.page is 0', () => {
    queryParams$.next({ page: 0 });
    expect(component.currentPage).toBe(1);
  });

  it('should default currentPage to 1 when queryParams.page is undefined', () => {
    queryParams$.next({ page: undefined });
    expect(component.currentPage).toBe(1);
  });


  it('should navigate to input link', () => {
    const windowSpy = spyOn(window, 'open');

    component.openLink('www.example.com');

    expect(windowSpy).toHaveBeenCalledWith('www.example.com', '_blank');
  });


});
