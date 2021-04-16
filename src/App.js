import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonsForm';
import personService from './services/Phonebook';
import Notifications from './components/Notifications';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      personService
        .removePerson(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          setErrorMessage(
            `Person '${e.target.name}' was already removed from the server.`
          );

          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);

          setPersons(persons.filter((person) => person.id !== id));
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

        personService
          .updatePerson(id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === id ? returnedPerson : person
              )
            );
          })
          .catch((error) => {
            setErrorMessage(error.response.data.error);
          });
      }

      setNewName('');
      setNewNumber('');
    } else {
      const personObj = {
        name: newName,
        number: newNumber,
      };

      personService
        .addPerson(personObj)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setSuccessMessage(`Added '${newName}' successfully to Phonebook`);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
        });

      setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 5000);

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

      <Notifications.DeleteError message={errorMessage} />
      <Notifications.Success message={successMessage} />

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
