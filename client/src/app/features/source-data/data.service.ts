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

  private gdp$$ = new BehaviorSubject<IEstatDataset | null>(null);
  gdp$ = this.gdp$$.asObservable();

  constructor(private apiService: ApiService) {}

  getPopulation(): Observable<IEstatDataset> {
    return this.apiService.getPopulation().pipe(
      tap((resposnse) => {
        this.population$$.next(resposnse);
      })
    );
  }

  getGdp(): Observable<IEstatDataset> {
    return this.apiService.getGDP().pipe(
      tap((response) => {
        this.gdp$$.next(response);
      })
    )
  }

  ngOnDestroy(): void {
    this.population$$.complete();
    this.gdp$$.complete();
  }
}
