import NavBar from "../components/NavBar"
import MovieCard from "../components/MovieCard"
import { getNowInTheathers } from "../api/api"
import { useState, useEffect } from "react"
function AllMovies() {
const [movies, setMovies] = useState([])

useEffect(() => {
        (async () => {
            try {
                const [now] = await Promise.all([
                    getNowInTheathers(),
                    
                ]);
                setMovies(now || []);
                
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

  return (
      <div>
        <NavBar/>
        <h1>allmovies</h1>
        <div className="allmovies-container">

                    {movies.map(movie => (
                        <MovieCard
                            movie={movie}
                            key={movie.id}
                        />
                    ))}

                </div>
      </div>
  )
}

export default AllMovies