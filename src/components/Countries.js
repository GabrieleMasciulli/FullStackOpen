import React from 'react';
import SingleCountry from './SingleCountry';

const Countries = ({ countries }) => {
  const length = countries.length;
  if (length === 250) {
    return <div></div>;
  }
  if (length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (length <= 10 && length > 1) {
    return (
      <div>
        <ul>
          {countries.map((country) => (
            <li key={country.alpha3Code}>{country.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  if (length === 1) {
    return <SingleCountry country={countries[0]} />;
  }
  if (length === 0) {
    return <div>No match</div>;
  }
};

export default Countries;
