import MovieCard from "../components/MovieCard"
import { getNowInTheathers, getGenre } from "../api/api"
import { useState, useEffect } from "react"

function Home() {

    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    useEffect(() => {

        const loadNowInTheathers = async () => {
            try {
                const nowInTheathers = await getNowInTheathers()
                setMovies(nowInTheathers)
            } catch (err) {
                console.error(err);
            }
        };
        const loadGenre = async () => {
            try {
                const genres = await getGenre()
                setGenres(genres)
            } catch (err) {
                console.error(err);
            }
        };
        loadGenre();
        loadNowInTheathers();
    }, [])

    return <div className="carousel">

        {movies.map(movie => <MovieCard movie={movie} genres={genres} key={movie.id} />)}

    </div>
}

export default Home