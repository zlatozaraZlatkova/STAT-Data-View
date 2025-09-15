interface DatasetDimension {
  unit: any;
  freq: any;
  indic_de: any;
  geo: any;
  time: any;
}

interface DatasetExtension {
  agencyId: string;
  annotation: any[];
  datastructure: {
    id: string;
    agencyId: string;
    version: string;
  };
  description: string;
  id: string;
  lang: string;
  'positions-with-no-data': {
    freq: number[];
    indic_de: number[];
    geo: number[];
  };
  version: string;
}

interface DatasetValue {
  [key: string]: number;
}

export interface IEstatDataset {
  class: 'dataset';
  dimension: DatasetDimension;
  extension: DatasetExtension;
  id: string[];
  label: string;
  size: number[];
  source: string;
  updated: string;
  value: DatasetValue;
  version: string;
}
