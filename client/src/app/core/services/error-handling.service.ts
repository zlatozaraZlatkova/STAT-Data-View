import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  private errorMessage$$ = new BehaviorSubject<string | null>(null);
  errorMessage$ = this.errorMessage$$
    .asObservable()
    .pipe(filter((message): message is string => message !== null));

  setError(error: HttpErrorResponse): void {
    const message = this.formatErrorMessage(error);
    this.errorMessage$$.next(message);
  }

  clearError(): void {
    this.errorMessage$$.next(null);
  }

  private formatErrorMessage(error: HttpErrorResponse): string {
    if (error.error?.error?.label) {
      return error.error.error.label;
    }

    if (error.error?.warning?.label) {
      return error.error.warning.label;
    }

    switch (error.status) {
      case 400:
        return 'Bad request';
      case 404:
        return 'Resource not found';
      case 500:
        return 'Internal server error';
      case 0:
        return 'Network error';
      default:
        return error.message || 'An error occurred';
    }
  }
}
