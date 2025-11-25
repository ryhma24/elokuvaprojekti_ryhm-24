import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/registerForm'
import { LoggedInButton } from './components/login-logoutButton'

import NavBar from "./components/NavBar"
import MovieCard from './components/MovieCard';
import { getNowInTheathers } from './api/api';
import Home from './pages/Home';


function App() {
  
   //const [showLogin, setShowLogin] = useState(false)
   //const [showRegister, setShowRegister] = useState(false) //true/false määrittelee näkyykö login komponentti.
    //pitää laittaa myöhemmin falseksi, jotta se ei sivun alkaessa näy

  return (
    <>
      <div>
         <NavBar/>
        <Home/>
      </div>
     </>
  )
}

export default App
