import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RssNewsListComponent } from './rss-news-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('RssNewsListComponent', () => {
  let component: RssNewsListComponent;
  let fixture: ComponentFixture<RssNewsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RssNewsListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
           params: of({}),
           queryParams: of({}),
           snapshot: { params: {}, queryParams: {} },
          }
        }
      ]
    });
    fixture = TestBed.createComponent(RssNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
