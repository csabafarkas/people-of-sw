import { createContext } from 'react';
import { InitialContextStateModel } from '../types';

const initialContextState = {
  planets: [],
} as InitialContextStateModel;

const PeoplesPlanetContext =
  createContext<InitialContextStateModel>(initialContextState);

export default PeoplesPlanetContext;
