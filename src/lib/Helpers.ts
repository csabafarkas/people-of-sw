import { Person } from '../types';

const sortPeople = (
  people: Person[],
  field: string,
  direction: 'asc' | 'desc' | undefined
) => {
  let sortedPeople = people.slice();

  if (field === 'height' || field === 'mass') {
    if (direction === 'asc') {
      sortedPeople = sortedPeople.sort((a, b) => a[field] - b[field]);
    } else if (direction === 'desc') {
      sortedPeople = sortedPeople.sort((a, b) => b[field] - a[field]);
    } else {
      sortedPeople = sortedPeople.sort((a, b) => a.fetchOrder - b.fetchOrder);
    }
  } else if (field === 'created' || field === 'edited') {
    if (direction === 'asc') {
      sortedPeople = sortedPeople.sort(
        (a, b) => new Date(a[field]).getTime() - new Date(b[field]).getTime()
      );
    } else if (direction === 'desc') {
      sortedPeople = sortedPeople.sort(
        (a, b) => new Date(b[field]).getTime() - new Date(a[field]).getTime()
      );
    } else {
      sortedPeople = sortedPeople.sort((a, b) => a.fetchOrder - b.fetchOrder);
    }
  } else if (field === 'planet') {
    if (direction === 'asc') {
      sortedPeople = sortedPeople.sort((a, b) =>
        a.planet.name.localeCompare(b.planet.name)
      );
    } else if (direction === 'desc') {
      sortedPeople = sortedPeople.sort((a, b) =>
        b.planet.name.localeCompare(a.planet.name)
      );
    } else {
      sortedPeople = sortedPeople.sort((a, b) => a.fetchOrder - b.fetchOrder);
    }
  } else {
    if (direction === 'asc') {
      sortedPeople = sortedPeople.sort((a, b) =>
        a[field].localeCompare(b[field])
      );
    } else if (direction === 'desc') {
      sortedPeople = sortedPeople.sort((a, b) =>
        b[field].localeCompare(a[field])
      );
    } else {
      sortedPeople = sortedPeople.sort((a, b) => a.fetchOrder - b.fetchOrder);
    }
  }
  return sortedPeople;
};

export { sortPeople };
