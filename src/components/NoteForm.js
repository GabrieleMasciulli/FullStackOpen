import React, { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = e => {
    setNewNote(e.target.value)
  }

  const addNote = e => {
    e.preventdefault()
    createNote({
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5, // 50% chance of being marked as important
    })

    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default NoteForm
