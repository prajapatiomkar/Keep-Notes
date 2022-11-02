import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import "./App.css"
export default function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || [])
  const [activeNote, setActiveNote] = useState(false)

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const onAddNote = () => {
    const newNotes = {
      id: uuid(),
      title: "untitled Notes",
      body: "",
      lastModified: Date.now()
    }
    setNotes([newNotes, ...notes])
  }

  const onDeleteNote = (idToDelete) => {
    // retrival notes feature  
    setNotes(notes.filter((note) => note.id !== idToDelete))
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote)
  }

  const onUpdateNote = (updateNote) => {
    const UpdateNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updateNote
      }
      return note
    })
    setNotes(UpdateNotesArray)
  }
  return (
    <div className='App'>
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main
        activeNote={getActiveNote()}
        onUpdateNote={onUpdateNote}
      />
    </div>
  )
}
