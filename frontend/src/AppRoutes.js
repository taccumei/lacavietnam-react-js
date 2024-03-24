import React from 'react'
import HomePage from './pages/Home/HomePage'
import { Route, Routes } from 'react-router-dom'
import FoodPage from './components/FoodPage/FoodPage'
import CartPage from './components/CartPage/CartPage'
import LoginPage from './pages/Home/Login/LoginPage'

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/search/:searchTerm" element={<HomePage />}/>
        <Route path="/tag/:tag" element={<HomePage />}/>
        <Route path="/food/:id" element={<FoodPage />} />
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </div>
  )
}
