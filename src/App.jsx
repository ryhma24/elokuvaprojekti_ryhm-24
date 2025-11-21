import { useState } from 'react'
import { useEffect } from 'react'
import NavBar from "./components/NavBar"
import MovieCard from './components/MovieCard';
import { getNowInTheathers } from './api/api';
import Home from './pages/Home';

function App() {
  
     return (
      <>
        <NavBar/>
        <Home/>
      </>
    )
}
export default App;