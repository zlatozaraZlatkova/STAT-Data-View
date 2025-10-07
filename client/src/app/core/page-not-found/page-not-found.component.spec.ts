import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent],
    });
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function getElByTestId(testId: string): HTMLElement {
    return fixture.nativeElement.querySelector(`[data-testid="${testId}"]`);
  }


  describe('Display text at page 404', () => {
    const elements = [
      { testId: 'header-text', text: 'Page not found' },
      {
        testId: 'page-text',
        text: `Sorry, we couldn't find the page you're looking for.`,
      },
    ];

    it('should display correct text at all checked elements', () => {
      fixture.detectChanges();

      elements.forEach(({ testId, text }) => {
        const currEl = getElByTestId(testId);

        expect(currEl).withContext(`${testId} element`).toBeTruthy();

        expect(currEl.textContent?.trim() ?? '')
          .withContext(`${testId} text`)
          .toBe(text);
      });
    });

    it('should not display empty text', () => {
      fixture.detectChanges();

      const elements = [
        { testId: 'header-text' },
        { testId: 'page-text' }
      ];

      elements.forEach(({ testId }) => {
        const currEl = getElByTestId(testId);

        expect(currEl.textContent?.trim())
          .withContext(`${testId} should not be empty`)
          .not.toBe('');
      });
    });


  });

});