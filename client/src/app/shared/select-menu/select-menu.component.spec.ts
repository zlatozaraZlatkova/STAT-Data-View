import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMenuComponent } from './select-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SelectMenuComponent', () => {
  let component: SelectMenuComponent;
  let fixture: ComponentFixture<SelectMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectMenuComponent],
      imports: [HttpClientTestingModule],

    });
    fixture = TestBed.createComponent(SelectMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
