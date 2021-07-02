import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { messageChange, removeMessage } from '../reducers/messageReducer'

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

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  const handleVote = anecdote => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(messageChange(`You voted '${anecdote.content}'`))

    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>

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

export default Anecdotes
