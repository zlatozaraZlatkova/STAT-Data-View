import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEstatDataset } from './interfaces/metricData';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseApiUrl = `/api/statistics/1.0/data`;
  private readonly baseRssUrl = `/api/catalogue/rss/en/statistics-update.rss`;

  private selectedCountry$$ = new BehaviorSubject<string>('AT');
  public selectedCountry$ = this.selectedCountry$$.asObservable();

  getCurrentCountry(): string {
    return this.selectedCountry$$.value;
  }

  setSelectedCountry(countryCode: string): void {
    this.selectedCountry$$.next(countryCode);
  }


  private readonly datasets = {
    population: { code: 'tps00001' },
    gdp: { code: 'nama_10_gdp', unit: 'CLV10_MEUR' },
    employment: { code: 'lfsi_emp_a', indic_em: 'EMP_LFS', sex: 'T', age: 'Y15-64', unit: 'THS_PER' },
    inflation: { code: 'tec00118' },
    tradeBalancePct: { code: 'tet00002', unit: 'MIO_EUR' },
    fdiFlowsPct: { code: 'tipsbp90' },
    governmentDebt: { code: 'teina225', unit: 'PC_GDP' },
    governmentDeficitSurplus: { code: 'teina200', unit: 'PC_GDP' },
    industryProduction: { code: 'sts_inpr_a', nace_r2: 'C', unit: 'I21' },
    nominalPerCapitaIncomeGrowth: { code: 'nasa_10_ki', na_item: 'B7G_N_HAB_GR', },
    realPerCapitaIncomeGrowth: { code: 'nasa_10_ki', na_item: 'B7G_R_HAB_GR' },
    savingRate: { code: 'nasa_10_ki', na_item: 'SRG_S14_S15' },
    investmentRate: { code: 'nasa_10_ki', na_item: 'IRG_S14_S15' },



  };

  constructor(private httpClient: HttpClient) { }

  getRssNews(): Observable<string> {
    return this.httpClient.get(this.baseRssUrl, { responseType: 'text' })
  }

  private buildUrl(datasetType: keyof typeof this.datasets): string {
    const datasets = this.datasets[datasetType];

    const selectedCountry = this.getCurrentCountry();

    const params = new URLSearchParams({
      format: 'JSON',
      lang: 'EN',
      geo: selectedCountry,
    });

    if('na_item' in datasets) {
      params.append('na_item', datasets.na_item)
    }

    if ('unit' in datasets) {
      params.append('unit', datasets.unit);
    }
    if ('nace_r2' in datasets) {
      params.append('nace_r2', datasets.nace_r2);
    }

    if ('indic_em' in datasets) {
      params.append('indic_em', datasets.indic_em);
      params.append('sex', datasets.sex);
      params.append('age', datasets.age);
      params.append('unit', datasets.unit);
    }

    // console.log(`URL: ` + `${this.baseApiUrl}/${datasets.code}?${params.toString()}`)
    return `${this.baseApiUrl}/${datasets.code}?${params.toString()}`;
  }

  private getData(datasetType: keyof typeof this.datasets): Observable<IEstatDataset> {
    return this.httpClient.get<IEstatDataset>(this.buildUrl(datasetType));
  }

  getPopulation() {
    return this.getData('population');
  }

  getGDP() {
    return this.getData('gdp');
  }

  getEmployment() {
    return this.getData('employment');
  }

  getInflation() {
    return this.getData('inflation');
  }

  getTradeBalance() {
    return this.getData('tradeBalancePct');
  }

  getForeignDirectInvestment() {
    return this.getData('fdiFlowsPct');
  }


  getGovernmentDebt() {
    return this.getData('governmentDebt')
  }

  getGovernmentDeficitSurplus() {
    return this.getData('governmentDeficitSurplus')
  }

  getProductionInInductrie() {
    return this.getData('industryProduction')
  }

  getNominalPerCapitaIncomeGrowth() {
    return this.getData('nominalPerCapitaIncomeGrowth');
  }

  getRealPerCapitaIncomeGrowth() {
    return this.getData('realPerCapitaIncomeGrowth')
  }

  getSavingRate() {
    return this.getData('savingRate');
  }

  getInvestmentRate() {
    return this.getData('investmentRate');
  }


}
