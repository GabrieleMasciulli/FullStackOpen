import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonsForm';
import personService from './services/Phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  console.log('persons', persons);

  const hook = () => {
    personService.getAll().then((initialPersons) => {
      setPersons(persons.concat(initialPersons));
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleDelete = (e) => {
    const id = e.target.id;

    if (window.confirm(`Want to delete ${e.target.name} ?`)) {
      personService.removePerson(id).then((response) => {
        personService.getAll().then((initialPersons) => {
          setPersons(initialPersons);
        });
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameIsInPersons =
      persons.filter(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      ).length > 0;

    if (nameIsInPersons) {
      const popup = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (popup) {
        const oldPerson = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        const id = oldPerson.id;
        const newPerson = { ...oldPerson, number: newNumber };

        personService.updatePerson(id, newPerson).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === id ? returnedPerson : person
            )
          );
        });
      }

      setNewName('');
      setNewNumber('');
    } else {
      const personObj = {
        name: newName,
        number: newNumber,
      };

      personService.addPerson(personObj).then((response) => {
        setPersons(persons.concat(response));
      });

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

      <Persons persons={personsToShow} remove={handleDelete} />
    </div>
  );
};

export default App;
