export interface Person {
  name: string;
  height: number;
  mass: number;
  created: string;
  edited: string;
  planetUrl: string;
  planet: PlanetModel;
  url: string;
  fetchOrder: number;
}

export interface PlanetModel {
  name: string;
  diameter: number;
  climate: string;
  population: number;
  url: string;
}

export type StateType = {
  people: Person[];
  planets: PlanetModel[];
  sortedField: string;
  sortDirection: 'asc' | 'desc' | undefined;
  loading: boolean;
  error: boolean;
};

export type ActionType = {
  type: string;
  payload: any;
};

export type InitialContextStateModel = {
  planets: PlanetModel[];
};
