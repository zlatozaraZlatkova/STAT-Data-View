import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { SelectMenuComponent } from 'src/app/shared/select-menu/select-menu.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, SelectMenuComponent],
      imports: [HttpClientTestingModule, MatIconModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  function getLinkByTestId(testId: string): HTMLElement {
    return fixture.nativeElement.querySelector(`[data-testid="${testId}"]`);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Sidebar Toggle', () => {
    it('should emit toggleSidebar event when onToggleSidebar is called', () => {
      const toggleEventEmitterSpy = spyOn(component.toggleSidebar, 'emit');
      component.onToggleSidebar();

      expect(toggleEventEmitterSpy).toHaveBeenCalled();
    });

    it('should emit toggleSidebar event only once per call', () => {
      const toggleEventEmitterSpy = spyOn(component.toggleSidebar, 'emit');
      component.onToggleSidebar();

      expect(toggleEventEmitterSpy).toHaveBeenCalledTimes(1);
    });

    it('should not emit during component initialization', () => {
      const toggleEventEmitterSpy = spyOn(component.toggleSidebar, 'emit');

      fixture.detectChanges();

      expect(toggleEventEmitterSpy).not.toHaveBeenCalled();
    });

    it('should not emit when other methods are called', () => {
      const toggleEventEmitterSpy = spyOn(component.toggleSidebar, 'emit');

      component.toggleUserMenu();

      expect(toggleEventEmitterSpy).not.toHaveBeenCalled();
    });
  });

  describe('User Menu Toggle', () => {
    it('should initialize as false', () => {
      expect(component.isUserMenuOpen()).toBe(false);
    });

    it('should toggle between true and false', () => {
      component.toggleUserMenu();
      expect(component.isUserMenuOpen()).toBe(true);

      component.toggleUserMenu();
      expect(component.isUserMenuOpen()).toBe(false);
    });
  });

  describe('Header Links', () => {
    const links = [
      { testId: 'link-dashboard', text: 'Dashboard', route: '/dashboard' },
      { testId: 'link-rss-news', text: 'RSS News', route: '/dashboard/rss-news' },
    ];

    it('should render all links with correct text and routerLink', () => {
      fixture.detectChanges();

      links.forEach(({ testId, text, route }) => {
        const link = getLinkByTestId(testId);

        expect(link).withContext(`${text} link`).toBeTruthy();

        expect(link.textContent?.trim() ?? '')
          .withContext(`${text} text`)
          .toBe(text);

        expect(link.getAttribute('routerlink'))
          .withContext(`${text} route`)
          .toBe(route);
      });
    });

    it('should not find non-existent link', () => {
      fixture.detectChanges();

      const nonExistent = fixture.nativeElement.querySelector(
        '[data-testid="link-nonexistent"]'
      );

      expect(nonExistent).toBeNull();
    });
  });
});
