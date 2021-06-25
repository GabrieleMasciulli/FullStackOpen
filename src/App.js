import React, { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className='error'>{message}</div>
}

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  // console.log('render', notes.length, 'notes')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = noteObj => {
    noteFormRef.current.toggleVisibility()
    noteService.create(noteObj).then(newNote => {
      setNotes(notes.concat(newNote))
    })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id === id ? returnedNote : note)))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToshow = showAll ? notes : notes.filter(note => note.important)

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setPassword('')
      setUsername('')
    } catch (e) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideOnLogin = { display: loginVisible ? 'none' : '' }
    const showOnLogin = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideOnLogin}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>

        <div style={showOnLogin}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const noteForm = () => {
    return (
      <Togglable buttonLabel='new note' ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    )
  }

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name}</p>
          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ul>
        {notesToshow.map((note, i) => (
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <Footer />
    </div>
  )
}

export default App
