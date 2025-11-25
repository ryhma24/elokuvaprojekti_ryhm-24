import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/registerForm'
import { LoggedInButton } from './components/login-logoutButton'


function App() {
  
   const [showLogin, setShowLogin] = useState(false)
   const [showRegister, setShowRegister] = useState(false) //true/false määrittelee näkyykö login komponentti.
    //pitää laittaa myöhemmin falseksi, jotta se ei sivun alkaessa näy

  return (
    <>
      <div>
        <LoggedInButton changeBoolLog = {setShowLogin} changeBoolReg = {setShowRegister} />
        {showLogin && <LoginForm onClose={() => setShowLogin(false)} />} 
       {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
      </div>
     </>
  )
}

export default App
