import MovieCard from "../components/MovieCard"
import { getNowInTheathers, getGenre, getPopularMovies, getPopularSeries } from "../api/api"
import { useState, useEffect } from "react"

function Home() {

    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [popularSeries, setPopularSeries] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const [now, genreList, popular, series] = await Promise.all([
                    getNowInTheathers(),
                    getGenre(),
                    getPopularMovies(),
                    getPopularSeries(),
                ]);
                setMovies(now || []);
                setGenres(genreList || []);
                setPopularMovies(popular || []);
                setPopularSeries(series || []);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <div>
            <h1 className="title">Now in theathers</h1>
            <div className="carousel-wrapper">
                <div className="carousel">

                    {movies.map(movie => (
                        <MovieCard
                            movie={movie}
                            genres={genres}
                            key={movie.id}
                        />
                    ))}

                </div>
            </div>
            <h1 className="title">Popular Movies</h1>

            <div className="carousel-wrapper">
                <div className="carousel">
                    {popularMovies.map(movie => (
                        <MovieCard
                            movie={movie}
                            genres={genres}
                            key={movie.id}
                        />
                    ))}
                </div>
            </div>
            <h1 className="title">Popular Series</h1>

            <div className="carousel-wrapper">
                <div className="carousel">
                    {popularSeries.map(movie => (
                        <MovieCard
                            movie={movie}
                            genres={genres}
                            key={movie.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )

}

export default Home