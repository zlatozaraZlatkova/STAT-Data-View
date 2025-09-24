import { TestBed } from '@angular/core/testing';

import { RssNewsService } from './rss-news.service';

describe('RssNewsService', () => {
  let service: RssNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RssNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
