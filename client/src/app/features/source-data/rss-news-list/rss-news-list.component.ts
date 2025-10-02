import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { RssNewsService } from 'src/app/core/services/rss-news.service';

@Component({
  selector: 'app-rss-news-list',
  templateUrl: './rss-news-list.component.html',
  styleUrls: ['./rss-news-list.component.css'],
})
export class RssNewsListComponent implements OnInit, OnDestroy {
  rssNews$ = this.rssNewsService.rssNews$;
  private destroy$ = new Subject<void>();

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private rssNewsService: RssNewsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadRSSForQueryParamsChange();
  }

  private loadPaginatedRss(page: number): void {
    this.currentPage = page;
    this.rssNewsService.getRssNews(page, this.itemsPerPage).pipe(take(1))
      .subscribe();
  }

  private loadRSSForQueryParamsChange(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$))
      .subscribe((urlParams) => {
        const pageNumberFromUrl = this.getPageFromUrl(urlParams);
        this.loadPaginatedRss(pageNumberFromUrl);
      });
  }

  private getPageFromUrl(urlParams: Params): number {
    const pageAsString = urlParams['page'];
    const pageAsNumber = parseInt(pageAsString, 10);

    if (!pageAsString || pageAsNumber < 1) {
      return 1;
    }

    return pageAsNumber;
  }

  onPageChange(page: number): void {
    this.router.navigate([], { queryParams: { page: page } });
  }

  openLink(link: string): void {
    window.open(link, '_blank');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}