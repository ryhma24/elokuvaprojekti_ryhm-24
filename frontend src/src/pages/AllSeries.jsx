
import NavBar from "../components/NavBar"
import MovieCard from "../components/MovieCard"
import { getDiscoverMovies, getDiscoverSeries } from "../api/api"
import { useState, useEffect } from "react"
import { FavouritesButton } from '../components/Favourites'
import { useAuth } from "../contexts/AuthContext.jsx";
//import { pageNumber } from "../api/functions"

function AllSeries() {
    const { accessToken, idaccount } = useAuth();
    const [pageNumber, setPageNumber] = useState(1)
    const [discover, setDiscover] = useState([])
    const [favouriteState, setFavouriteState] = useState([]);
    

    const nextPage = () => {
        setPageNumber(prev => prev + 1)
    }
    const previousPage = () => {
        if(pageNumber > 1)
        {
        setPageNumber(prev => prev - 1)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const movies = await getDiscoverSeries(pageNumber);
                setDiscover(movies || []);
                
            } catch (err) {
                console.error(err);
            }
        })();
        async function fetchFavourites() 
        {
            if(accessToken)
            {
            const user = idaccount
            console.log(user)
            const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/favourites/${user}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            const data = await res.json();
            setFavouriteState(data.map(f => f.movieid));
            console.log("Fetched favourites:", data);
            }
        }
        fetchFavourites()
    }, [pageNumber, accessToken]);

    return (
        <div>
            <NavBar />
            

            <h1 className="big-titles">TV-Series</h1>
            <div className="allmovies-container">

                {discover.map(movie => (
                    <MovieCard
                        movie={movie}
                        key={movie.id}
                        favouriteState={favouriteState}
                        setFavouriteState={setFavouriteState}
                    />
                ))}

            </div>
            <div className="wrappernappi">
            <button className="nextPageButton" id="sivunappiPrev" onClick={previousPage}>Previous Page</button>
            <button className="nextPageButton" id="sivunappi" onClick={nextPage}>Next Page</button>
            </div>
        </div>
    )
}
export default AllSeries