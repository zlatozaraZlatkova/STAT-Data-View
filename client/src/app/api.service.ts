import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEstatDataset } from './interfaces/metricData';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = `/api`;

  private readonly datasets = {
    population: { code: 'tps00001' },
    gdp: { code: 'nama_10_gdp', unit: 'CLV10_MEUR' },
    employment: { code: 'lfsi_emp_a', indic_em:'EMP_LFS', sex:'T', age:'Y15-64', unit:'THS_PER' },
    inflation: { code: 'tec00118' },
  };

  constructor(private httpClient: HttpClient) {}

  private buildUrl(datasetType: keyof typeof this.datasets): string {
    const datasets = this.datasets[datasetType];

    const params = new URLSearchParams({
      format: 'JSON',
      lang: 'EN',
      geo: 'AT',
    });

    if ('unit' in datasets) {
      params.append('unit', datasets.unit);
    }

     if ('indic_em' in datasets) {
      params.append('indic_em', datasets.indic_em);
      params.append('sex', datasets.sex);
      params.append('age', datasets.age);
      params.append('unit', datasets.unit);
    }

    console.log(`URL: ` + `${this.baseUrl}/${datasets.code}?${params.toString()}`)
    return `${this.baseUrl}/${datasets.code}?${params.toString()}`;
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

}
