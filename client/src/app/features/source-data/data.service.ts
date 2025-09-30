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

  private nominalCapitaIncomeGrowth$$ = new BehaviorSubject<IEstatDataset | null>(null);
  nominalCapitaIncomeGrowth$ = this.nominalCapitaIncomeGrowth$$.asObservable();

  private realPerCapitaIncomeGrowth$$ = new BehaviorSubject<IEstatDataset | null>(null);
  realPerCapitaIncomeGrowth$ = this.realPerCapitaIncomeGrowth$$.asObservable();

  private savingRate$$ = new BehaviorSubject<IEstatDataset | null>(null);
  savingRate$ = this.savingRate$$.asObservable();

  private investmentRate$$ = new BehaviorSubject<IEstatDataset | null>(null);
  investmentRate$ = this.investmentRate$$.asObservable();

  constructor(private apiService: ApiService) {}

  getNominalCapitaIncomeGrowth(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      tap(() => this.nominalCapitaIncomeGrowth$$.next(null)), 
      switchMap(() => this.apiService.getNominalPerCapitaIncomeGrowth()),
      tap((response) => {
        this.nominalCapitaIncomeGrowth$$.next(response);
      }),
      shareReplay(1)
    );
  }

  getRealCapitaIncomeGrowth(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      tap(() => this.realPerCapitaIncomeGrowth$$.next(null)),
      switchMap(() => this.apiService.getRealPerCapitaIncomeGrowth()),
      tap((response) => {
        this.realPerCapitaIncomeGrowth$$.next(response);
      }),
      shareReplay(1)
    );
  }

  getSavingRate(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      tap(() => this.savingRate$$.next(null)),
      switchMap(() => this.apiService.getSavingRate()),
      tap((response) => {
        this.savingRate$$.next(response);
      }),
      shareReplay(1)
    );
  }

  getInvestmentRate(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      tap(() => this.investmentRate$$.next(null)),
      switchMap(() => this.apiService.getInvestmentRate()),
      tap((response) => {
        this.investmentRate$$.next(response);
      }),
      shareReplay(1)
    );
  }

  getPopulation(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      tap(() => this.population$$.next(null)),
      switchMap(() => this.apiService.getPopulation()),
      tap((response) => {
        this.population$$.next(response);
      }),
      shareReplay(1)
    );
  }

  getGdp(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      tap(() => this.gdp$$.next(null)),
      switchMap(() => this.apiService.getGDP()),
      tap((response) => {
        this.gdp$$.next(response);
      }),
      shareReplay(1)
    );
  }

  getEmployment(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      tap(() => this.employment$$.next(null)),
      switchMap(() => this.apiService.getEmployment()),
      tap((response) => {
        this.employment$$.next(response);
      }),
      shareReplay(1)
    );
  }

  getInflation(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      tap(() => this.inflation$$.next(null)),
      switchMap(() => this.apiService.getInflation()),
      tap((response) => {
        this.inflation$$.next(response);
      }),
      shareReplay(1)
    );
  }

  getTotalTradeBalance(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      tap(() => this.tradeBalance$$.next(null)),
      switchMap(() => this.apiService.getTradeBalance()),
      tap((response) => {
        this.tradeBalance$$.next(response);
      }),
      shareReplay(1)
    );
  }

  getDirectInvestmentPctGdp(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      tap(() => this.foreignDirectInvestment$$.next(null)),
      switchMap(() => this.apiService.getForeignDirectInvestment()),
      tap((response) => {
        this.foreignDirectInvestment$$.next(response);
      }),
      shareReplay(1)
    );
  }

  governmentDebt(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      tap(() => this.governmentDebt$$.next(null)),
      switchMap(() => this.apiService.getGovernmentDebt()),
      tap((response) => {
        this.governmentDebt$$.next(response);
      }),
      shareReplay(1)
    );
  }

  govDeficitSurplus(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      tap(() => this.govDeficitSurplus$$.next(null)),
      switchMap(() => this.apiService.getGovernmentDeficitSurplus()),
      tap((response) => {
        this.govDeficitSurplus$$.next(response);
      }),
      shareReplay(1)
    );
  }

  getIndustryProduction(): Observable<IEstatDataset> {
    return this.apiService.selectedCountry$.pipe(
      tap(() => this.industryProduction$$.next(null)),
      switchMap(() => this.apiService.getProductionInInductrie()),
      tap((response) => {
        this.industryProduction$$.next(response);
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
    this.nominalCapitaIncomeGrowth$$.complete();
    this.realPerCapitaIncomeGrowth$$.complete();
    this.savingRate$$.complete();
    this.investmentRate$$.complete();
  }
}