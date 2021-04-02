import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonsForm';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  console.log('persons', persons);

  const hook = () => {
    console.log('effect');
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('request fulfilled');
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameIsInPersons =
      persons.filter((person) => person.name === newName).length > 0;

    const numberIsInPersons =
      persons.filter((person) => person.number === newNumber).length > 0;

    if (nameIsInPersons || numberIsInPersons) {
      if (nameIsInPersons) {
        window.alert(`${newName} is already added to phonebook...`);
      } else {
        window.alert(`${newNumber} is already added to phonebook...`);
      }

      setNewName('');
      setNewNumber('');
    } else {
      const personObj = {
        name: newName,
        number: newNumber,
      };

      setPersons(persons.concat(personObj));
      setNewName('');
      setNewNumber('');
    }
  };

  const personsToShow = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(filter) ||
      person.number.toLowerCase().includes(filter)
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleInput={handleFilterChange} />

      <h2>Add a new person to phonebook:</h2>

      <PersonForm
        submit={handleSubmit}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
