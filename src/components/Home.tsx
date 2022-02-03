import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';
const Home = ({
  handleTableHeaderClick,
  people,
  sortedField,
  sortDirection,
}) => {
  const location = useLocation();
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
                    <Link
                      className='link'
                      to={{
                        pathname: `/planets/${person.planet.name}`,
                        state: { background: location },
                      }}
                    >
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

export default Home;
