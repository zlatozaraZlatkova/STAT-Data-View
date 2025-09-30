import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';

import { RssNewsService } from 'src/app/core/services/rss-news.service';
import { IRssNews, IRssNewsItem } from 'src/app/interfaces/rssNews';

@Component({
  selector: 'app-rss-news',
  templateUrl: './rss-news.component.html',
  styleUrls: ['./rss-news.component.css'],
})
export class RssNewsComponent implements OnInit {
  rssNews$: Observable<IRssNews | null> = this.rssNewsService.rssNews$;

  shortListRssNews$: Observable<IRssNewsItem[]> =
    this.rssNewsService.rssNews$.pipe(
      map((rss) => (rss ? rss.items.slice(0, 3) : []))
    );

  constructor(private rssNewsService: RssNewsService, private router: Router) {}

  ngOnInit(): void {
    this.loadRssNews();
  }

  loadRssNews() {
    this.rssNewsService.getRssNews().pipe(take(1)).subscribe();
  }

  redirectTo() {
    this.router.navigate(['/dashboard/rss-news'])
  }

  openLink(link: string): void {
    window.open(link, '_blank');
  }
}
