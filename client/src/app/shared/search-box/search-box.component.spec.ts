import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoxComponent } from './search-box.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let searchChangeSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBoxComponent],
      imports: [FormsModule, MatIconModule]
    });
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;

    searchChangeSpy = spyOn(component.searchChange, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSearchChange', () => {

    it('should not emit during component initialization', () => {
      expect(searchChangeSpy).not.toHaveBeenCalled();
    });

    it('should emit if searchText is "Test serach input"', () => {
      component.searchText = 'Test serach input';
      component.onSearchChange();
      expect(searchChangeSpy).toHaveBeenCalledWith('Test serach input');
    });

    it('should not emit if searchText is empty string', () => {
      component.searchText = '';
      component.onSearchChange();
      expect(searchChangeSpy).not.toHaveBeenCalled();
    });

    it('should not emit if searchText is null', () => {
      component.searchText = null as any;
      component.onSearchChange();
      expect(searchChangeSpy).not.toHaveBeenCalled();
    });

    it('should not emit if searchText is undefined', () => {
      component.searchText = undefined as any;
      component.onSearchChange();
      expect(searchChangeSpy).not.toHaveBeenCalled();
    });


  })

  describe('onClearSearch', () => {
    it('should clear searchText and emit', () => {
      component.searchText = 'Clear text';

      component.onClearSearch();

      expect(component.searchText).toBe('');
      expect(searchChangeSpy).toHaveBeenCalled();
    });

  })


});
