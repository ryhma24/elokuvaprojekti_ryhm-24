import MovieCard from "../components/MovieCard"
import { getNowInTheathers, getGenre, getPopularMovies, getPopularSeries } from "../api/api"
import { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import { useAuth } from "../contexts/AuthContext.jsx";

function Home() {

    const { accessToken, idaccount } = useAuth();
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [popularSeries, setPopularSeries] = useState([])

    const [favouriteState, setFavouriteState] = useState([]);

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

        async function fetchFavourites() {
            const user = idaccount
            console.log(user)
            const res = await fetch(`http://localhost:3001/favourites/${user}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            const data = await res.json();
            console.log("Fetched favourites:", data);
            setFavouriteState(data.map(f => f.movieid));
        }
        fetchFavourites();
    }, [accessToken]);

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