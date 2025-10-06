import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoxComponent } from './search-box.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBoxComponent],
      imports: [FormsModule, MatIconModule]
    });
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
