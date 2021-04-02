import React from 'react';

const Filter = ({ handleInput }) => {
  return (
    <div>
      Find countries: <input onChange={handleInput} />
    </div>
  );
};

export default Filter;
