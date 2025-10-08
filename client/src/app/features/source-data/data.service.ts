import { Injectable } from '@angular/core';
import { shareReplay, startWith, switchMap } from 'rxjs';

import { ApiService } from 'src/app/api.service';


@Injectable({
  providedIn: 'root',
})

export class DataService {

  constructor(private apiService: ApiService) { }

  population$ = this.apiService.selectedCountry$.pipe(
    switchMap(() => this.apiService.getPopulation().pipe(
      startWith(null)
    )),
    shareReplay(1)
  );

  gdp$ = this.apiService.selectedCountry$.pipe(
    switchMap(() => this.apiService.getGDP().pipe(
      startWith(null)
    )),
    shareReplay(1)
  );

  employment$ = this.apiService.selectedCountry$.pipe(
    switchMap(() => this.apiService.getEmployment().pipe(
      startWith(null)
    )),
    shareReplay(1)
  );

  inflation$ = this.apiService.selectedCountry$.pipe(
    switchMap(() => this.apiService.getInflation().pipe(
      startWith(null)
    )),
    shareReplay(1)
  );

  tradeBalance$ = this.apiService.selectedCountry$.pipe(
    switchMap(() => this.apiService.getTradeBalance().pipe(
      startWith(null)
    )),
    shareReplay(1)
  );

  foreignDirectInvestment$ = this.apiService.selectedCountry$.pipe(
    switchMap(() => this.apiService.getForeignDirectInvestment().pipe(
      startWith(null)
    )),
    shareReplay(1)
  );

  governmentDebt$ = this.apiService.selectedCountry$.pipe(
    switchMap(() => this.apiService.getGovernmentDebt().pipe(
      startWith(null)
    )),
    shareReplay(1)
  );

  govDeficitSurplus$ = this.apiService.selectedCountry$.pipe(
    switchMap(() => this.apiService.getGovernmentDeficitSurplus().pipe(
      startWith(null)
    )),
    shareReplay(1)
  );

  industryProduction$ = this.apiService.selectedCountry$.pipe(
    switchMap(() => this.apiService.getProductionInInductrie().pipe(
      startWith(null)
    )),
    shareReplay(1)
  );

  nominalCapitaIncomeGrowth$ = this.apiService.selectedCountry$.pipe(
    switchMap(() => this.apiService.getNominalPerCapitaIncomeGrowth().pipe(
      startWith(null)
    )),
    shareReplay(1)
  );

  realPerCapitaIncomeGrowth$ = this.apiService.selectedCountry$.pipe(
    switchMap(() => this.apiService.getRealPerCapitaIncomeGrowth().pipe(
      startWith(null)
    )),
    shareReplay(1)
  );

  savingRate$ = this.apiService.selectedCountry$.pipe(
    switchMap(() => this.apiService.getSavingRate().pipe(
      startWith(null)
    )),
    shareReplay(1)
  );

  investmentRate$ = this.apiService.selectedCountry$.pipe(
    switchMap(() => this.apiService.getInvestmentRate().pipe(
      startWith(null)
    )),
    shareReplay(1)
  );



}