import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import PeoplesPlanetContext from '../context/PeoplePlanetContext';
import Modal from './Modal';

const Planet = () => {
  let planetName = useParams().id;
  const context = useContext(PeoplesPlanetContext);
  const planet = context.planets.find((planet) => planet.name === planetName);
  return (
    <div className='planet-modal'>
      <h4 className='title'>{planetName}</h4>
      <ul style={{ listStyleType: 'none' }}>
        <li>
          <span>Diameter:</span>
          <span>{planet?.diameter ?? 'Unknown'}</span>
        </li>
        <li>
          <span>Climate:</span>
          <span>{planet?.climate ?? 'Unknown'}</span>
        </li>
        <li>
          <span>Population:</span>
          <span>{planet?.population ?? 'Unknown'}</span>
        </li>
      </ul>
      <button>
        <Link className='link' to='/'>
          &larr;&nbsp;Back to People
        </Link>
      </button>
    </div>
  );
};

export default Planet;
