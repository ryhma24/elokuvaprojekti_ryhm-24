import { useState } from 'react'
import { useEffect } from 'react'


import './App.css'

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
//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmY0YmI0ZGI0YjYwNjk3ZGM4Mzg0NGZlMGQ0MDhiOSIsIm5iZiI6MTc2Mjk1MDIxOS4wNDksInN1YiI6IjY5MTQ3YzRiNTgzZjE5ZjZhZTlhY2ViNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NAo0JpxedzRH6iw5i1GbR8Y6ofNw228UFsjMh8gGeIg
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
        <div>
            <h3>Now in theathers</h3>
            <Movies />
        </div>
    )
}
export default App;