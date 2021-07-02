import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = props => {
  const dispatcher = useDispatch()

  const addAnecdote = async e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    dispatcher(createAnecdote(content))
  }
  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={addAnecdote}>
        <div>
          <input type='text' name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
