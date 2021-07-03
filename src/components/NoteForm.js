import React from 'react'
import { createNote } from '../reducers/noteReducer'
import { connect } from 'react-redux'

const NoteForm = props => {
  const addNote = async e => {
    e.preventDefault()
    const content = e.target.note.value
    e.target.note.value = ''

    props.createNote(content)
  }

  return (
    <form onSubmit={addNote}>
      <input type='text' name='note' />
      <button type='submit'>add</button>
    </form>
  )
}

export default connect(null, { createNote })(NoteForm)
