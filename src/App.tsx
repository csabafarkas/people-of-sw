import { useEffect, useReducer } from 'react';
import { BrowserRouter, Link, Switch, Redirect, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { sortPeople } from './lib/Helpers';
import { StateType, Person, PlanetModel, ActionType } from './types';
import PeoplesPlanetContext from './context/PeoplePlanetContext';
import Planet from './components/Planet';

const App = () => {
  const initialState: StateType = {
    people: [] as Person[],
    planets: [] as PlanetModel[],
    sortedField: '',
    sortDirection: undefined,
    loading: true,
    error: false,
  };

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
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/people' />
          </Route>
          <Route path='/people'>
            <Home
              handleTableHeaderClick={handleTableHeaderClick}
              people={people}
              sortedField={sortedField}
              sortDirection={sortDirection}
            />
          </Route>
          <Route path='/planets/:id'>
            <Planet />
          </Route>
        </Switch>
        <Switch></Switch>
      </BrowserRouter>
    </PeoplesPlanetContext.Provider>
  );
};

const Home = ({
  handleTableHeaderClick,
  people,
  sortedField,
  sortDirection,
}) => {
  return (
    <div className='container'>
      <h1 className='title'>People</h1>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleTableHeaderClick('name')}>
                <span className='theader'>Name</span>{' '}
                {sortedField === 'name' ? (
                  sortDirection === 'asc' ? (
                    <span>&#9660;</span>
                  ) : sortDirection === 'desc' ? (
                    <span>&#9650;</span>
                  ) : null
                ) : null}
              </th>
              <th onClick={() => handleTableHeaderClick('height')}>
                <span className='theader'>Height</span>{' '}
                {sortedField === 'height' ? (
                  sortDirection === 'asc' ? (
                    <span>&#9660;</span>
                  ) : sortDirection === 'desc' ? (
                    <span>&#9650;</span>
                  ) : null
                ) : null}
              </th>
              <th onClick={() => handleTableHeaderClick('mass')}>
                <span className='theader'>Mass</span>{' '}
                {sortedField === 'mass' ? (
                  sortDirection === 'asc' ? (
                    <span>&#9660;</span>
                  ) : sortDirection === 'desc' ? (
                    <span>&#9650;</span>
                  ) : null
                ) : null}
              </th>
              <th onClick={() => handleTableHeaderClick('created')}>
                <span className='theader'>Created</span>{' '}
                {sortedField === 'created' ? (
                  sortDirection === 'asc' ? (
                    <span>&#9660;</span>
                  ) : sortDirection === 'desc' ? (
                    <span>&#9650;</span>
                  ) : null
                ) : null}
              </th>
              <th onClick={() => handleTableHeaderClick('edited')}>
                <span className='theader'>Edited</span>{' '}
                {sortedField === 'edited' ? (
                  sortDirection === 'asc' ? (
                    <span>&#9660;</span>
                  ) : sortDirection === 'desc' ? (
                    <span>&#9650;</span>
                  ) : null
                ) : null}
              </th>
              <th onClick={() => handleTableHeaderClick('planet')}>
                <span className='theader'>Planet</span>{' '}
                {sortedField === 'planet' ? (
                  sortDirection === 'asc' ? (
                    <span>&#9660;</span>
                  ) : sortDirection === 'desc' ? (
                    <span>&#9650;</span>
                  ) : null
                ) : null}
              </th>
            </tr>
          </thead>
          <tbody>
            {(people as Person[]).map((person) => {
              return (
                <tr key={person.url}>
                  <td>{person.name}</td>
                  <td>{person.height}</td>
                  <td>{person.mass}</td>
                  <td>{new Date(person.created).toLocaleDateString()}</td>
                  <td>{new Date(person.edited).toLocaleDateString()}</td>
                  <td
                    style={{
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontWeight: 'bold',
                    }}
                  >
                    <Link class='link' to={`/planets/${person.planet.name}`}>
                      {person.planet.name}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <pre>{JSON.stringify(people, undefined, 2)}</pre> */}
    </div>
  );
};

export default App;
