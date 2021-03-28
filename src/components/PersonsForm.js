import React from 'react';

const PersonForm = ({
  submit,
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
}) => {
  return (
    <form onSubmit={submit}>
      <div>
        Name: <input onChange={onNameChange} value={newName} />
      </div>

      <div>
        Number: <input onChange={onNumberChange} value={newNumber} />
      </div>

      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
