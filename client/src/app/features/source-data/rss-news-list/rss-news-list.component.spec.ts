import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RssNewsListComponent } from './rss-news-list.component';

describe('RssNewsListComponent', () => {
  let component: RssNewsListComponent;
  let fixture: ComponentFixture<RssNewsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RssNewsListComponent]
    });
    fixture = TestBed.createComponent(RssNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
