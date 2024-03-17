import React from 'react'
import HomePage from './pages/Home/HomePage'
import { Route, Routes } from 'react-router-dom'
import FoodPage from './components/FoodPage/FoodPage'

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/search/:searchTerm" element={<HomePage />}/>
        <Route path="/tag/:tag" element={<HomePage />}/>
        <Route path="/food/:id" element={<FoodPage />}/>
      </Routes>
    </div>
  )
}
