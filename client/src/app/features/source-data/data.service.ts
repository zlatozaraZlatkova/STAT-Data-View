import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, switchMap, tap } from 'rxjs';
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
  employment$ = this.employment$$.asObservable();

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
    return this.apiService.selectedCountry$.pipe(
      switchMap(() => this.apiService.getPopulation()),
      tap((response) => {
        this.population$$.next(response);
         console.log(response)
      }),
      shareReplay(1)
    );
  }

  getGdp(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      switchMap(() => this.apiService.getGDP()),
      tap((response) => {
        this.gdp$$.next(response);
         console.log(response)
      }),
      shareReplay(1)
    );
  }

  getEmployment(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      switchMap(() => this.apiService.getEmployment()),
      tap((response) => {
        this.employment$$.next(response);
         console.log(response)
      }),
      shareReplay(1)
    );
  }

  getInflation(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      switchMap(() => this.apiService.getInflation()),
      tap((response) => {
        this.inflation$$.next(response);
       console.log(response)
      }),
      shareReplay(1)
    );
  }

  getTotalTradeBalance(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      switchMap(() => this.apiService.getTradeBalance()),
      tap((response) => {
        this.tradeBalance$$.next(response);
         console.log(response)
      }),
      shareReplay(1)
    );
  }

  getDirectInvestmentPctGdp(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      switchMap(() => this.apiService.getForeignDirectInvestment()),
      tap((response) => {
        this.foreignDirectInvestment$$.next(response);
         console.log(response)
      }),
      shareReplay(1)
    );
  }

  governmentDebt(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      switchMap(() => this.apiService.getGovernmentDebt()),
      tap((response) => {
        this.governmentDebt$$.next(response);
         console.log(response)
      }),
      shareReplay(1)
    );
  }
  govDeficitSurplus(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      switchMap(() => this.apiService.getGovernmentDeficitSurplus()),
      tap((response) => {
        this.govDeficitSurplus$$.next(response);
         console.log(response)
      }),
      shareReplay(1)
    );
  }

  getIndustryProduction(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      switchMap(() => this.apiService.getProductionInInductrie()),
      tap((response) => {
        this.industryProduction$$.next(response);
         console.log(response)
      }),
      shareReplay(1)
    );
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
