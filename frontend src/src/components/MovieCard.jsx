import { useNavigate } from 'react-router-dom'
import { FavouritesButton } from './Favourites'

function MovieCard({movie, favouriteState, setFavouriteState}){
    const navigate = useNavigate();
    const typeLabel = movie.release_date ? "movie" : movie.first_air_date ? "tv" : "";

    
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
                    <FavouritesButton
                        movieId={movie.id}
                        favouriteState={favouriteState}
                        setFavouriteState={setFavouriteState}
                        typeLabel = {typeLabel}
                    />
                </div>
            </div>
    </div>
}

export default MovieCard