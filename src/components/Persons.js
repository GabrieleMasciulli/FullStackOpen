import React from 'react';
import Person from './Person';

const Persons = ({ persons, remove }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          id={person.id}
          deleteHandler={remove}
        />
      ))}
    </ul>
  );
};

export default Persons;
