import React from 'react'
import HomePage from './pages/Home/HomePage'
import { Route, Routes } from 'react-router-dom'
import Search from './components/Search/Search'

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/search/:searchTerm" element={<HomePage />}/>
      </Routes>
    </div>
  )
}
