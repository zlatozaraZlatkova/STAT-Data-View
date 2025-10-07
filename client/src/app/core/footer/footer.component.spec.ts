import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  function getLinkByTestId(testId: string): HTMLElement {
    return fixture.nativeElement.querySelector(`[data-testid=${testId}]`);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Footer Links', () => {
    const links = [
      { testId: 'link-terms', text: 'Terms', route: '/terms' },
      { testId: 'link-privacy', text: 'Privacy', route: '/privacy' },
      { testId: 'link-contact', text: 'Contact', route: '/contact' },
    ];

    it('should render all links with correct text and routes', () => {
      fixture.detectChanges();

      links.forEach(({ testId, text, route }) => {
        const link = getLinkByTestId(testId);

        expect(link).withContext(`${text} link should exist`).toBeTruthy();

        expect(link.textContent.trim())
          .withContext(`${text} link should have correct text`)
          .toBe(text);

        expect(link.getAttribute('routerlink'))
          .withContext(`${text} link should point to ${route}`)
          .toBe(route);
      });
    });

    it('should have correct CSS classes for all links', () => {
      fixture.detectChanges();

      links.forEach(({ testId, text }) => {
        const link = getLinkByTestId(testId);

        expect(link.classList.contains('text-gray-600'))
          .withContext(`${text} link should have text-gray-600 class`)
          .toBe(true);
        expect(link.classList.contains('hover:text-blue-600'))
          .withContext(`${text} link should have text-gray-600 class`)
          .toBe(true);
      });
    });

    it('should navigate to correct page when link is clicked', () => {
      fixture.detectChanges();

      links.forEach(({ testId, text, route }) => {
        const link = getLinkByTestId(testId);

        expect(link.getAttribute('routerlink'))
          .withContext(`${text} link should navigate to ${route}`)
          .toBe(route);
      });
    });

    it('should have routerLinkActive directive', () => {
      fixture.detectChanges();

      links.forEach(({ testId, text }) => {
        const link = getLinkByTestId(testId);

        expect(link.getAttribute('routerlinkactive'))
          .withContext(`${text} link routerLinkActive classes`)
          .toBe('border-b-2 border-blue-600');
      });
    });

    it('should not find non-existent link', () => {
      fixture.detectChanges();

      const nonExistent = fixture.nativeElement.querySelector(
        '[data-testid="link-nonexistent"]'
      );

      expect(nonExistent).toBeNull();
    });

    it('should handle click without throwing error', () => {
      fixture.detectChanges();

      links.forEach(({ testId, text }) => {
        const link = getLinkByTestId(testId);

        expect(() => link.click())
          .withContext(`${text} link click should not throw`)
          .not.toThrow();
      });
    });

    
  });


});
