import React from 'react'
import HomePage from './pages/Home/HomePage'
import { Route, Routes } from 'react-router-dom'

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/search/:searchTerm" element={<HomePage />}/>
        <Route path="/tag/:tag" element={<HomePage />}/>
      </Routes>
    </div>
  )
}
