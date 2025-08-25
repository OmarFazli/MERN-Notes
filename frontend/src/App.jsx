import React from 'react'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router'
import CreatePage from './pages/CreatePage'
import NoteDetailsPage from './pages/NoteDetailsPage'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div data-theme="dark" className='bg bg-base-300'>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<CreatePage/>}/>
        <Route path="/note/:id" element={<NoteDetailsPage/>}/>
      </Routes>
    </div>
  )
}

export default App