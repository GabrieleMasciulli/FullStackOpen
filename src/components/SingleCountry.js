import React, { useEffect, useState } from 'react';
import Weather from './Weather';
import axios from 'axios';

const SingleCountry = ({ country }) => {
  const [weather, setWeather] = useState('');

  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: country.capital,
  };

  useEffect(() => {
    console.log('Weather fetching effect');
    axios
      .get('http://api.weatherstack.com/current', { params })
      .then((response) => {
        console.log('weather request fulfilled');
        setWeather(response.data);
      });
  }, []);

  console.log(weather);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Spoken Languages:</h3>
      {
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
      }
      <img src={country.flag} alt='' width='200' height='200' />

      <h3>Weather in {country.capital}</h3>

      {/* rendering weather component as soon as the data fetching is complete */}
      {weather.hasOwnProperty('current') ? (
        <Weather data={weather} />
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default SingleCountry;
