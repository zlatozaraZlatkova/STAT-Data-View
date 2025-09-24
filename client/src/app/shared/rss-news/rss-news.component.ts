import { Component, OnInit } from '@angular/core';
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
      map((rss) => (rss ? rss.items.slice(0, 6) : []))
    );

  constructor(private rssNewsService: RssNewsService) {}

  ngOnInit(): void {
    this.loadRssNews();
  }

  loadRssNews() {
    this.rssNewsService.getRssNews().pipe(take(1)).subscribe();
  }

  openLink(link: string): void {
    window.open(link, '_blank');
  }
}
