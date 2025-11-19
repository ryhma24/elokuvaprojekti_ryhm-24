import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/registerForm'
import { Button } from './components/test component'

function App() {
  
   const [showLogin, setShowLogin] = useState(true)
   const [showRegister, setShowRegister] = useState(true) //true/false määrittelee näkyykö login komponentti.
    //pitää laittaa myöhemmin falseksi, jotta se ei sivun alkaessa näy. {showLogin && <LoginForm onClose={() => setShowLogin(false)} />} 

  return (
    <>
      <div>
        {showLogin && <LoginForm onClose={() => setShowLogin(false)} />} 
       {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
      </div>
     </>
  )
}

export default App
