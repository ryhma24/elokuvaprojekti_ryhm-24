function MovieCard({movie}){

    function onFavouriteClick(){
        alert("clickewd")
    }

    return <div className="movie-card">  
        <div className="movie-poster">
            <img className ="movie-image"src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="movie-overlay">
                <button className="favourite-btn" onClick={onFavouriteClick}>
                    Like
                </button>

            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
            <p>{movie.genre_ids+" "}</p>
        </div>
    </div>
}

export default MovieCard