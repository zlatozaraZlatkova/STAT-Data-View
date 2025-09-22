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

  private governmentDebt$$ = new BehaviorSubject<IEstatDataset | null>(null);
  governmentDebt$ = this.governmentDebt$$.asObservable();

  private govDeficitSurplus$$ = new BehaviorSubject<IEstatDataset | null>(null);
  govDeficitSurplus$ = this.govDeficitSurplus$$.asObservable();

  private industryProduction$$ = new BehaviorSubject<IEstatDataset | null>(null);
  industryProduction$ = this.industryProduction$$.asObservable();

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

  governmentDebt(): Observable<IEstatDataset> {
    return this.apiService.getGovernmentDebt().pipe(
      tap((response) => {
        this.governmentDebt$$.next(response);
      })
    )
  }
  govDeficitSurplus(): Observable<IEstatDataset> {
    return this.apiService.getGovernmentDeficitSurplus().pipe(
      tap((response) => {
        this.govDeficitSurplus$$.next(response);
      })
    )
  }

  getIndustryProduction(): Observable<IEstatDataset> {
    return this.apiService.getProductionInInductrie().pipe(
      tap((response) => {
        this.industryProduction$$.next(response);
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
    this.governmentDebt$$.complete();
    this.industryProduction$$.complete();
    this.govDeficitSurplus$$.complete();
 
  }
}
