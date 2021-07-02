import React from 'react'
import Notification from './components/Notification'
import Anecdotes from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  return (
    <div>
      <Notification />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App
