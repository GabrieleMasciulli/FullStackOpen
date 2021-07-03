import React from 'react'
import Filter from './Filter'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const Anecdote = ({ anecdote, onVote }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={onVote}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = props => {
  const sortedAnecdotes = props.anecdotes.sort((a, b) => b.votes - a.votes)

  const handleVote = anecdote => {
    props.voteAnecdote(anecdote)
    props.setNotification(`You voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      <h2>Anecdotes</h2>

      <Filter />

      {sortedAnecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          onVote={() => {
            handleVote(anecdote)
          }}
        />
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    anecdotes:
      state.filter === 'ALL'
        ? state.anecdotes
        : state.anecdotes.filter(({ content }) =>
            content.toLowerCase().includes(state.filter.toLowerCase())
          ),
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(Anecdotes)
