import { useNavigate } from 'react-router-dom';

function MovieCard({movie}){
    const navigate = useNavigate();
    const typeLabel = movie.release_date ? "movie" : movie.first_air_date ? "tv" : "";


    function onFavouriteClick(){
        alert("clickewd")
    }
    return <div className="movie-card" onClick={(e) => {navigate(`/${typeLabel}/title/${movie.id}`)}}>  
            <div className="movie-poster">
                <img className ="movie-image"src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                    
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <h3 className="movie-title">{movie.name}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
                <p>{movie.first_air_date?.split("-")[0]}</p>
                <div className="movie-overlay">
                        <button className="favourite-btn" onClick={onFavouriteClick}>
                            Like
                        </button>

                    </div>
            </div>
    </div>
}

export default MovieCard