import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { IEstatDataset } from 'src/app/interfaces/metricData';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnDestroy {
  private population$$ = new BehaviorSubject<IEstatDataset | null>(null);
  population$ = this.population$$.asObservable();

  constructor(private apiService: ApiService) {}

  getPopulation(): Observable<IEstatDataset> {
    return this.apiService.getPopulation().pipe(
      tap((resposnse) => {
        this.population$$.next(resposnse);
      })
    );
  }

  ngOnDestroy(): void {
    this.population$$.complete();
  }
}
