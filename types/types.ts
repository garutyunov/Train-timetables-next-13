export enum StationsEnum {
  BASEL = 'Basel',
  GENEVA = 'Geneva'
}

export type Stations = StationsEnum.BASEL | StationsEnum.GENEVA;

export enum TableType {
  ARRIVALS = 'arrivals',
  DEPARTURES = 'departures'
}

export type Trains = {
  destination: Train[];
  arrivals: Train[];
};

export type Train = {
  date: string | null;
  destination: string;
  id: number;
};
