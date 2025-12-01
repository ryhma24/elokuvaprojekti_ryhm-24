import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/registerForm'
import { LoggedInButton } from './components/login-logoutButton'


import NavBar from "./components/NavBar"
import MovieCard from './components/MovieCard';
import { getNowInTheathers } from './api/api';
import Home from './pages/Home';
import {Routes, Route} from "react-router-dom"

function App() {

  return (
    
      <div>
        <Home/>
      </div>
     
  )
}

export default App
