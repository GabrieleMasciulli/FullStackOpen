import React from 'react';

const Person = ({ name, number, id, deleteHandler }) => {
  return (
    <li>
      {name}, {number}{' '}
      <input
        name={name}
        type='button'
        value='delete'
        id={id}
        onClick={deleteHandler}
      />
    </li>
  );
};

export default Person;
