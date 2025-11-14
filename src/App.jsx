import { useState } from 'react'
import { useEffect } from 'react'
import NavBar from "./components/NavBar"
import MovieCard from './components/MovieCard';

//import './App.css'

const apiKey = import.meta.env.VITE_API_KEY;
function App() {

  const [movies, setMovies] = useState([])

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
//      --url 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1' \
//    --url 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1' \
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
      setMovies(json.results)
      })
      .catch(error => {
        console.log(error)
      })
    }, [])

     return (
      <>
        <NavBar/>
        <MovieCard movie={{title:"vmovie", release_date:"1.2.234"}}/>
      </>
    )
}
export default App;