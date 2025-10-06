import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorHandlingService } from './core/services/error-handling.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  destroy$ = new Subject<void>();

  constructor(
    private errorHandlingService: ErrorHandlingService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.displayError();
  }

  private displayError(): void {
    this.errorHandlingService.errorMessage$
      .pipe(takeUntil(this.destroy$))
      .subscribe((message) => {
        this.toastrService.error(message, 'Error');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
