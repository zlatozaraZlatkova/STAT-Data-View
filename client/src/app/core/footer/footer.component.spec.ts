import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Terms Link', () => {
    it('should display Terms link with corrent text', () => {
      fixture.detectChanges();

      const termsLink = fixture.nativeElement.querySelector('[data-testid="link-terms"]');

      expect(termsLink).toBeTruthy();
      expect(termsLink.textContent.trim()).toBe('Terms');
    })

    it('should have correct CSS classes for Terms link', () => {
      fixture.detectChanges();

      const termsLink = fixture.nativeElement.querySelector('[data-testid="link-terms"]');

      expect(termsLink.classList.contains('text-gray-600')).toBe(true);
      expect(termsLink.classList.contains('hover:text-blue-600')).toBe(true);
    })

    it('should navigate to Terms page when link is clicked', () => {
      fixture.detectChanges();

      const termsLink = fixture.nativeElement.querySelector('[data-testid="link-terms"]');

      expect(termsLink.getAttribute('routerlink')).toBe('/terms');

    })

    it('should have routerLinkActive directive', () => {
      fixture.detectChanges();
      const termsLink = fixture.nativeElement.querySelector('[data-testid="link-terms"]');

      expect(termsLink.getAttribute('routerlinkactive')).toBe('border-b-2 border-blue-600');
    });


    it('should not find non-existent link', () => {
      fixture.detectChanges();

      const nonExistent = fixture.nativeElement.querySelector('[data-testid="link-nonexistent"]');

      expect(nonExistent).toBeNull();
    });


    it('should handle click without throwing error', () => {
      fixture.detectChanges();

      const termsLink = fixture.nativeElement.querySelector('[data-testid="link-terms"]');

      expect(() => termsLink.click()).not.toThrow();
    });

  })


});
