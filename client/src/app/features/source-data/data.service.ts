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

  private employment$$ = new BehaviorSubject<IEstatDataset | null>(null);
  employment$= this.employment$$.asObservable();

  private inflation$$ = new BehaviorSubject<IEstatDataset | null>(null);
  inflation$ = this.inflation$$.asObservable();

  private tradeBalance$$ = new BehaviorSubject<IEstatDataset | null>(null);
  tradeBalance$ = this.tradeBalance$$.asObservable();

  private foreignDirectInvestment$$ = new BehaviorSubject<IEstatDataset | null>(null);
  foreignDirectInvestment$ = this.foreignDirectInvestment$$.asObservable();

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

  getEmployment(): Observable<IEstatDataset> {
    return this.apiService.getEmployment().pipe(
      tap((response)  => {
        this.employment$$.next(response);
      })
    )
  }

  getInflation(): Observable<IEstatDataset> {
    return this.apiService.getInflation().pipe(
      tap((response) => {
        this.inflation$$.next(response);
      })
    )
  }

  getTotalTradeBalance(): Observable<IEstatDataset> {
    return this.apiService.getTradeBalance().pipe(
      tap((response) => {
        this.tradeBalance$$.next(response);
      })
    )
  }

  getDirectInvestmentPctGdp(): Observable<IEstatDataset> {
    return this.apiService.getForeignDirectInvestment().pipe(
      tap((response) => {
        this.foreignDirectInvestment$$.next(response);
      })
    )
  }


  ngOnDestroy(): void {
    this.population$$.complete();
    this.gdp$$.complete();
    this.employment$$.complete();
    this.inflation$$.complete();
    this.tradeBalance$$.complete();
    this.foreignDirectInvestment$$.complete();
 
  }
}
