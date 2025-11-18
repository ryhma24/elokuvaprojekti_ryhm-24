import { useState } from 'react'
import { useEffect } from 'react'
import NavBar from "./components/NavBar"
import MovieCard from './components/MovieCard';
import { getNowInTheathers } from './api/api';
import Home from './pages/Home';

function App() {

  

  /*const [movies, setMovies] = useState([])

  const Movies = () => {
    return (
      <table>
        <tbody>
        { movies && movies.map(movie => (
          <tr key={movie.id}><td>{movie.title}</td></tr>
        ))}
        </tbody>
      </table>
    )
  }

   useEffect(() => {
      fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',{
        headers:{
            Authorization: `Bearer ${apiKey}`,
            'Content-Type':'application/json'
        }

      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
      setMovies(json.results)
      })
      .catch(error => {
        console.log(error)
      })
    }, [])*/

     return (
      <>
        <NavBar/>
        <Home/>
        
      </>
    )
}
export default App;