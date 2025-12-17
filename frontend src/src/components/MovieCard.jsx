import { useNavigate } from 'react-router-dom'
import { FavouritesButton } from './Favourites'
import { useFavourites } from "../contexts/FavouritesContext";
import { FetchRating } from "../components/Rating"
import { useAuth } from "../contexts/AuthContext.jsx";

function MovieCard({movie}){

    const navigate = useNavigate();
    const typeLabel = movie.release_date ? "movie" : movie.first_air_date ? "tv" : "";
    const { favouriteState, setFavouriteState } = useFavourites();
    const { accessToken } = useAuth();

if(accessToken)
{  
    return <div className="movie-card">  
            <div className="movie-poster" onClick={(e) => {navigate(`/${typeLabel}/title/${movie.id}`)}}>
                <img className ="movie-image"src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                    
            </div>
            <div className="movie-info">
                <h3 className="movie-title" onClick={(e) => {navigate(`/${typeLabel}/title/${movie.id}`)}}>{movie.title}</h3>
                <h3 className="movie-title" onClick={(e) => {navigate(`/${typeLabel}/title/${movie.id}`)}}>{movie.name}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
                <p>{movie.first_air_date?.split("-")[0]}</p>
                <div className="movie-overlay">
                    <FetchRating
                        vote_average={movie.vote_average}
                    />
                    
                    
                </div>
                <FavouritesButton
                        typeLabel={typeLabel}
                        movieId={movie.id}
                        favouriteState={favouriteState}
                        setFavouriteState={setFavouriteState}
                    />
            </div>
    </div>
}
else
{
 return <div className="movie-card">  
            <div className="movie-poster" onClick={(e) => {navigate(`/${typeLabel}/title/${movie.id}`)}}>
                <img className ="movie-image"src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                    
            </div>
            <div className="movie-info">
                <h3 className="movie-title" onClick={(e) => {navigate(`/${typeLabel}/title/${movie.id}`)}}>{movie.title}</h3>
                <h3 className="movie-title" onClick={(e) => {navigate(`/${typeLabel}/title/${movie.id}`)}}>{movie.name}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
                <p>{movie.first_air_date?.split("-")[0]}</p>
                <div className="movie-overlay"></div>
                 <FetchRating
                        vote_average={movie.vote_average}
                />
            </div>
    </div>
}
}

export default MovieCard