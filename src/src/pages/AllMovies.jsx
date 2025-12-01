import NavBar from "../components/NavBar"
import MovieCard from "../components/MovieCard"
import { getDiscoverMovies } from "../api/api"
import { useState, useEffect } from "react"
//import { pageNumber } from "../api/functions"

function AllMovies() {

    const [pageNumber, setPageNumber] = useState(1)
    const [discover, setDiscover] = useState([])

    const nextPage = () => {
        setPageNumber(prev => prev + 1)
    }

    useEffect(() => {
        (async () => {
            try {
                const movies = await getDiscoverMovies(pageNumber);
                setDiscover(movies || []);
                
            } catch (err) {
                console.error(err);
            }
        })();
    }, [pageNumber]);

    return (
        <div>
            <NavBar />
            

            <h1>allmovies</h1>
            <div className="allmovies-container">

                {discover.map(movie => (
                    <MovieCard
                        movie={movie}
                        key={movie.id}
                    />
                ))}

            </div>
            <button className="nextPageButton" id="sivunappi" onClick={nextPage}>next page</button>
        </div>
    )
}

export default AllMovies