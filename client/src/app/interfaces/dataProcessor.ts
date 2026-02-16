export interface ProcessedDataResult {
  currentValue: number;
  previousValue?: number;
  hasData: boolean;
}

export interface YearWithValue {
  year: string;
  value: number;
}
