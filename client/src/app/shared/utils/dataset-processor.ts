export interface ProcessedDataResult {
  currentValue: number;
  previousValue?: number;
  hasData: boolean;
}

export function isMultiDimensional(size: number[]): boolean {
  return (
    size && size.length > 1 && size.some((s, i) => i < size.length - 1 && s > 1)
  );
}

export function processMultiDimensionalData(
  years: string[],
  timeIndex: Record<string, number>,
  values: Record<string, number>,
  size: number[],
): ProcessedDataResult {
  const timeSize = size[size.length - 1];
  const valueKeys = Object.keys(values)
    .map(Number)
    .sort((a, b) => a - b);

  const availableYearIndices = valueKeys.map((key) => key % timeSize);

  const availableYears = years
    .map((year) => ({ year, index: timeIndex[year] }))
    .filter((item) => availableYearIndices.includes(item.index))
    .sort((a, b) => a.index - b.index);

  if (availableYears.length === 0) {
    return { currentValue: 0, hasData: false };
  }

  const currentYearData = availableYears[availableYears.length - 1];
  const previousYearData =
    availableYears.length >= 2
      ? availableYears[availableYears.length - 2]
      : null;

  const currentValueKey = valueKeys.find(
    (key) => key % timeSize === currentYearData.index,
  );
  const previousValueKey = previousYearData
    ? valueKeys.find((key) => key % timeSize === previousYearData.index)
    : undefined;

  if (currentValueKey !== undefined && values[currentValueKey] !== undefined) {
    return {
      currentValue: values[currentValueKey],
      previousValue:
        previousValueKey !== undefined ? values[previousValueKey] : undefined,
      hasData: true,
    };
  }

  return { currentValue: 0, hasData: false };
}

export function processSimpleData(
  years: string[],
  timeIndex: Record<string, number>,
  values: Record<string, number>,
): ProcessedDataResult {
  const availableYears = years
    .map((year) => ({ year, index: timeIndex[year] }))
    .filter(
      (item) => values[item.index] !== undefined && values[item.index] !== null,
    )
    .sort((a, b) => a.index - b.index);

  if (availableYears.length === 0) {
    return { currentValue: 0, hasData: false };
  }

  const currentYearData = availableYears[availableYears.length - 1];
  const previousYearData =
    availableYears.length >= 2
      ? availableYears[availableYears.length - 2]
      : null;

  return {
    currentValue: values[currentYearData.index],
    previousValue: previousYearData
      ? values[previousYearData.index]
      : undefined,
    hasData: true,
  };
}
