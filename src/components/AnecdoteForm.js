import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = props => {
  const addAnecdote = async e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    props.createAnecdote(content)
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

const mapDispatchToProps = { createAnecdote }

export default connect(null, mapDispatchToProps)(AnecdoteForm)
