import MovieCard from "../components/MovieCard"
import { getNowInTheathers, getGenre, getPopularMovies, getPopularSeries } from "../api/api"
import { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import { useAuth } from "../contexts/AuthContext.jsx";

function Home() {

    const { accessToken } = useAuth();
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
            const res = await fetch("http://localhost:3001/favourites/1", { //hardcoded
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            const data = await res.json();
            console.log("Fetched favourites:", data);
            setFavouriteState(data.map(f => f.favourites));
        }
        fetchFavourites();
    }, [accessToken]);

    return (
        <div>
            <NavBar/>
            <h1 className="title">Now in theathers</h1>
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
            <h1 className="title">Popular Movies</h1>

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
            <h1 className="title">Popular Series</h1>

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