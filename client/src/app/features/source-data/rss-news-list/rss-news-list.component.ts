import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';

import { RssNewsService } from 'src/app/core/services/rss-news.service';
import { getPageFromUrl } from 'src/app/shared/utils/get-page-from-url';

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
    this.loadAllRss();
    this.syncQueryParamsChange();
  }

  private loadAllRss(): void {
    this.rssNewsService.getRssNews().pipe(take(1)).subscribe();
  }

  private syncQueryParamsChange(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$))
      .subscribe((urlParams) => {
        this.currentPage = getPageFromUrl(urlParams);
      });
  }


  onPageChange(page: number): void {
    this.router.navigate([], { 
      queryParams: { page: page }, 
      queryParamsHandling: 'merge' 
    });
  }

  openLink(link: string): void {
    window.open(link, '_blank');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}