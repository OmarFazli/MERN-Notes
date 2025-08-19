import React from 'react'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router'
import CreatePage from './pages/CreatePage'
import NoteDetailsPage from './pages/NoteDetailsPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<CreatePage/>}/>
        <Route path="/note/:id" element={<NoteDetailsPage/>}/>
      </Routes>
    </div>
  )
}

export default App