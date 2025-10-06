import { TestBed } from '@angular/core/testing';

import { RssNewsService } from './rss-news.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RssNewsService', () => {
  let service: RssNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RssNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
