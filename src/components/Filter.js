import React from 'react';

const Filter = ({ handleInput }) => {
  return (
    <div>
      Filter shown with <input onChange={handleInput} />
    </div>
  );
};

export default Filter;
