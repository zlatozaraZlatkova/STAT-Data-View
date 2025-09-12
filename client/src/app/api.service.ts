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
    employment: { code: 'lfsi_emp_a' },
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
