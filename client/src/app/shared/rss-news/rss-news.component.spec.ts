import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RssNewsComponent } from './rss-news.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('RssNewsComponent', () => {
  let component: RssNewsComponent;
  let fixture: ComponentFixture<RssNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RssNewsComponent],
      imports: [HttpClientTestingModule] 
      
    });
    fixture = TestBed.createComponent(RssNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
