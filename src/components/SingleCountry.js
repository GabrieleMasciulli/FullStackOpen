import React from 'react';

const SingleCountry = (props) => {
  const country = props.countries[0];
  console.log(country);
  return (
    <div>
      <h1>{props.countries[0].name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      {
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
      }
      <img src={country.flag} alt='' width='200' height='200' />
    </div>
  );
};

export default SingleCountry;
