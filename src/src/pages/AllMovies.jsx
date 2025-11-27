import NavBar from "../components/NavBar"
import MovieCard from "../components/MovieCard"
import { getDiscoverMovies } from "../api/api"
import { useState, useEffect } from "react"

function AllMovies() {

    const [discover, setDiscover] = useState([])
    

    useEffect(() => {
        (async () => {
            try {
                const [movies] = await Promise.all([
                    getDiscoverMovies(),
                    
                ]);
                setDiscover(movies || []);
                
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

                    {discover.map(movie => (
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