import MovieCard from "../components/MovieCard"
import { getNowInTheathers, getGenre, getPopularMovies, getPopularSeries } from "../api/api"
import { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import { useAuth } from "../contexts/AuthContext.jsx";
import { useFavourites } from "../contexts/FavouritesContext";

function Home() {

    const { accessToken, idaccount } = useAuth();
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [popularSeries, setPopularSeries] = useState([])

    const { favouriteState, setFavouriteState } = useFavourites();


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
    },[]);
    return (
        <div>
            <NavBar/>
            <h1 className="big-titles">Now in theathers</h1>
            <div className="carousel-wrapper">
                <div className="carousel">

                    {movies.map(movie => (
                        <MovieCard
                            movie={movie}
                            genres={genres}
                            key={movie.id}
                            favouriteState={favouriteState}
                            setFavouriteState={setFavouriteState}
                        />
                    ))}

                </div>
            </div>
            <h1 className="big-titles">Popular Movies</h1>

            <div className="carousel-wrapper">
                <div className="carousel">
                    {popularMovies.map(movie => (
                        <MovieCard
                            movie={movie}
                            genres={genres}
                            key={movie.id}
                            favouriteState={favouriteState}
                            setFavouriteState={setFavouriteState}
                        />
                    ))}
                </div>
            </div>
            <h1 className="big-titles">Popular Series</h1>

            <div className="carousel-wrapper">
                <div className="carousel">
                    {popularSeries.map(movie => (
                        <MovieCard
                            movie={movie}
                            genres={genres}
                            key={movie.id}
                            favouriteState={favouriteState}
                            setFavouriteState={setFavouriteState}
                        />
                    ))}
                </div>
            </div>
        </div>
    )

}

export default Home