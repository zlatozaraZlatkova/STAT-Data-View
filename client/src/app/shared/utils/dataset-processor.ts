import { map, Observable } from "rxjs";
import { ProcessedDataResult, YearWithValue } from "src/app/interfaces/dataProcessor";
import { IEstatDataset } from "src/app/interfaces/metricData";



export function isMultiDimensional(size: number[]): boolean {
  return size && size.length > 1 && size.some((s, i) => i < size.length - 1 && s > 1);
}


export function getAvailableYearsWithValues(
  dataset: IEstatDataset
): YearWithValue[] {
  if (!dataset?.value || !dataset?.dimension?.time?.category?.index) {
    return [];
  }

  const timeIndex = dataset.dimension.time.category.index;
  const years = Object.keys(timeIndex).sort();
  const values = dataset.value;
  const size = dataset.size;

  if (isMultiDimensional(size)) {
    const timeSize = size[size.length - 1];
    const valueKeys = Object.keys(values).map(Number);

    return years
      .map(year => {
        const timeIdx = timeIndex[year];
        const valueKey = valueKeys.find(key => key % timeSize === timeIdx);
        return valueKey !== undefined && values[valueKey] !== undefined
          ? { year, value: values[valueKey] }
          : null;
      })
      .filter((item): item is YearWithValue => item !== null);
  } else {
    return years
      .map(year => ({
        year,
        value: values[timeIndex[year]]
      }))
      .filter(item => item.value !== undefined && item.value !== null);
  }
}

export function processDataset(dataset: IEstatDataset): ProcessedDataResult {
  const yearsData = getAvailableYearsWithValues(dataset);

  if (yearsData.length === 0) {
    return { currentValue: 0, hasData: false };
  }

  const currentValue = yearsData[yearsData.length - 1].value;
  const previousValue = yearsData.length >= 2 
    ? yearsData[yearsData.length - 2].value 
    : undefined;

  return {
    currentValue,
    previousValue,
    hasData: true
  };
}


export function processMultiDimensionalData(
  years: string[],
  timeIndex: Record<string, number>,
  values: Record<string, number>,
  size: number[]
): ProcessedDataResult {
 
  const dataset = {
    value: values,
    dimension: { time: { category: { index: timeIndex } } },
    size
  } as IEstatDataset;
  
  return processDataset(dataset);
}


export function processSimpleData(
  years: string[],
  timeIndex: Record<string, number>,
  values: Record<string, number>
): ProcessedDataResult {
  
  const dataset = {
    value: values,
    dimension: { time: { category: { index: timeIndex } } },
    size: [1]
  } as IEstatDataset;
  
  return processDataset(dataset);
}


export function getLastDataYearWithUpdate(dataset$: Observable<IEstatDataset | null>): Observable<string> {
  return dataset$.pipe(
    map(data => {
      if (!data) return '';
      
      const yearsData = getAvailableYearsWithValues(data);
      const lastYear = yearsData.length > 0 ? yearsData[yearsData.length - 1].year : '';
      
      if (!lastYear) return '';
      
      if (data.updated) {
        const updateDate = new Date(data.updated).toLocaleDateString('en-GB');
        return `Data for ${lastYear}, updated on ${updateDate}`;
      }
      
      return `Data for ${lastYear}`;
    })
  );
}