import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { RssNewsService } from 'src/app/core/services/rss-news.service';

@Component({
  selector: 'app-rss-news-list',
  templateUrl: './rss-news-list.component.html',
  styleUrls: ['./rss-news-list.component.css']
})
export class RssNewsListComponent implements OnInit {
  rssNews$ = this.rssNewsService.rssNews$;

  selectedDataPeriod: string = '';
  selectedDate: string = '';
  searchText: string = '';
  filteredItems: any[] = [];


  constructor(private rssNewsService: RssNewsService) { }

  ngOnInit(): void {
    this.loadAllRssNesw();
  }



  loadAllRssNesw(): void {
    this.rssNewsService.getRssNews().pipe(take(1)).subscribe({
      next: (data) => console.log(data)
    });
  }

  openLink(link: string): void {
    window.open(link, '_blank');
  }

}
