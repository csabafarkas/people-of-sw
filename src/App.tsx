import { useEffect, useReducer } from 'react';
import { Link, Switch, Redirect, Route, useLocation } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { sortPeople } from './lib/Helpers';
import { StateType, Person, PlanetModel, ActionType } from './types';
import PeoplesPlanetContext from './context/PeoplePlanetContext';
import Planet from './components/Planet';
import Home from './components/Home';
import Modal from './components/Modal';

const App = () => {
  const initialState: StateType = {
    people: [] as Person[],
    planets: [] as PlanetModel[],
    sortedField: '',
    sortDirection: undefined,
    loading: true,
    error: false,
  };

  const location = useLocation();
  const background = location.state && location.state.background;

  const reducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
      case 'FETCH_PEOPLE_SUCCESS':
        return {
          ...state,
          loading: state.people && state.planets ? false : true,
          people: action.payload,
        };
      case 'FETCH_PEOPLE_FAILURE':
        return {
          ...state,
          loading: false,
          error: true,
        };
      case 'FETCH_PLANETS_SUCCESS':
        return {
          ...state,
          loading: state.people && state.planets ? false : true,
          planets: action.payload,
        };
      case 'SORTING_CHANGED':
        return {
          ...state,
          sortedField: action.payload.sortedField,
          sortDirection: action.payload.sortDirection,
          people: sortPeople(
            state.people,
            action.payload.sortedField,
            action.payload.sortDirection
          ),
        };
      default:
        return state;
    }
  };
  const [
    { people, planets, sortedField, sortDirection, loading, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleTableHeaderClick = (field: string) => {
    let direction: 'asc' | 'desc' | undefined;
    if (field !== sortedField || sortDirection === undefined) {
      direction = 'asc';
    } else {
      direction = sortDirection === 'asc' ? 'desc' : undefined;
    }

    dispatch({
      type: 'SORTING_CHANGED',
      payload: {
        sortedField: field,
        sortDirection: direction,
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      let ppl: Person[] = [];
      try {
        const res = await axios.get('https://swapi.dev/api/people/');
        ppl = res.data.results.map((person, index) => {
          return {
            name: person.name,
            height: person.height,
            mass: person.mass,
            created: person.created,
            edited: person.edited,
            planetUrl: person.homeworld,
            url: person.url,
            fetchOrder: index,
          } as Person;
        });
      } catch (error) {
        dispatch({
          type: 'FETCH_PEOPLE_FAILURE',
          payload: error,
        });
        return;
      }

      const plnts = await Promise.all(
        Array.from(new Set(ppl.map((person) => person.planetUrl))).map(
          async (url) => {
            return await axios.get(url).then((res) => res.data);
          }
        )
      ).then((res) =>
        res.map((planet) => {
          return {
            name: planet.name,
            diameter: planet.diameter,
            climate: planet.climate,
            population: planet.population,
            url: planet.url,
          };
        })
      );

      ppl.forEach((person) => {
        person.planet = plnts.find(
          (planet) => planet.url === person.planetUrl
        ) ?? {
          name: 'Unknown',
          diameter: 0,
          climate: 'Unknown',
          population: 0,
          url: '',
        };
      });

      dispatch({
        type: 'FETCH_PEOPLE_SUCCESS',
        payload: ppl,
      } as ActionType);
      dispatch({
        type: 'FETCH_PLANETS_SUCCESS',
        payload: plnts,
      });
    };

    fetchData();
  }, []);

  return (error as boolean) ? (
    <div className='container'>
      <h3 className='title'>
        There was an error while loading the data. Please check your connection
        and try again
      </h3>
    </div>
  ) : (loading as boolean) ? (
    <h1 className='title'>Loading...</h1>
  ) : (
    <PeoplesPlanetContext.Provider value={{ planets }}>
      <Switch location={background || location}>
        <Route exact path='/'>
          <Home
            handleTableHeaderClick={handleTableHeaderClick}
            people={people}
            sortedField={sortedField}
            sortDirection={sortDirection}
          />
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
      {background && (
        <Route
          path='/planets/:id'
          children={
            <Modal>
              <Planet />
            </Modal>
          }
        />
      )}
    </PeoplesPlanetContext.Provider>
  );
};

export default App;
