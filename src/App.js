import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Countries from './components/Countries';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('countries fetching effect');
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      console.log('countries request fulfilled');
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(filter)
  );

  if (countries.length === 0) {
    return <div>loading...</div>;
  } else {
    return (
      <div>
        <h2>Countries</h2>
        <Filter handleInput={handleFilterChange} />
        <Countries countries={countriesToShow} />
      </div>
    );
  }
};

export default App;
