import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Anecdotes from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'

import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

import anecdoteService from './services/anecdote.service'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      .getAll()
      .then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <Notification />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App
