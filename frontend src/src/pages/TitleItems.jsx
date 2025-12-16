import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useFavourites } from "../contexts/FavouritesContext";
import { useReview } from "../contexts/ReviewContext";
import { FavouritesButton } from "../components/Favourites";
import { FetchRating, StarRating, MakeAComment } from "../components/Rating"
import { useAuth } from "../contexts/AuthContext.jsx";


const TitleItems = () => {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const { favouriteState, setFavouriteState } = useFavourites();
  const { reviewState, movieReviews, fetchReviewsByMovieId } = useReview();
  const { accessToken, user } = useAuth();
  const [showCommentForm, setShowCommentForm] = useState(false);

 
  useEffect(() => {

    const getTitleInfo = async () => {
      const apiKey1 = import.meta.env.VITE_API_KEY;
      console.log("API KEY:ss", import.meta.env.VITE_API_KEY);
      console.log("moviereviews", movieReviews);
      try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=${apiKey1}`)

        console.log(response);

        const json = await response.json();
        setData(json)


      } catch (error) {
        console.error('Error fetching movie data:', error)
        }
    }
    getTitleInfo();
    console.log("type",type)
    console.log("id",id)
    
  }, [type, id]);

  useEffect(() => {
    if (data?.id) {
      fetchReviewsByMovieId(data.id);
      console.log("movieid", data.id);
      console.log("moviereviews", movieReviews);
    }
  }, [data]);

  if (!data) return <p>Loading...</p>;

  


  //console.log("reviewState type:", typeof reviewState, reviewState);
  const userReview = Array.isArray(reviewState)
  ? reviewState.find(r => r.idmovie === data?.id)
  : undefined;
  //console.log("revireestate", reviewState)

  if(accessToken)
  {  
    return (
      <div>
          <NavBar/>
          <div className="titleinfo-container">
            <div className="titleinfo-left">
              <h1>{data.title || data.name}</h1>
              <p>{data.genres?.map(g => g.name).join(", ")}
                <span style={{ marginLeft: "4rem" }}>
                  {data.runtime && `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}min`}
                </span> 
              </p>
              <div className="icons-row">
                <div className="tmdb-rating">
                  <p className='ratingResultLabel'>TMDB Rating</p>
                  <FetchRating vote_average={data.vote_average}/>
                </div>
                {userReview && (
                  <div className="your-rating">
                    <p className='ratingLabel'>Your Rating</p>
                    <StarRating 
                    movieId={data.id}
                    typeLabel={type}
                    reviewState={reviewState}
                    />
                  </div>
                )}
                <FavouritesButton
                  typeLabel={type}
                  movieId={Number(id)}
                  favouriteState={favouriteState}
                  setFavouriteState={setFavouriteState}
                />
              </div>
              <p>{data.overview}</p>
              <p>Release date: {data.release_date || data.first_air_date}</p>
              <div className="review">
                <button 
                  className="addreview-btn"
                  onClick={() => setShowCommentForm(prev => !prev)}
                >
                  {userReview ? "Edit Review" : "Add Review"}
                </button>

                {showCommentForm && (
                  <div className="popup">
                    <MakeAComment
                      typeLabel={type}
                      movieId={data.id} />
                    <button onClick={() => setShowCommentForm(false)}>Close</button>
                  </div>
                )}
              </div>
              <div className="all-reviews">
                <h2>User Reviews</h2>
                {Array.isArray(movieReviews) && movieReviews.length > 0 ? (
                  movieReviews.map(r => (
                    <div key={r.idreviews} className="review-item">
                      <p><strong>{r.username}</strong> rated {r.rating}/5</p>
                      <p>{r.review}</p>
                      <p className="review-date">{r.date}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet for this title.</p>
                )}
              </div>
            </div>
            <div className="titleinfo-right">
              {data.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={data.title || data.name}
                />
              )}
            </div>
          </div>
      </div>
    );
  }
  else
  {
    return (
      <div>
          <NavBar/>
          <div className="titleinfo-container">
            <div className="titleinfo-left">
              <h1>{data.title || data.name}</h1>
              <p>{data.genres?.map(g => g.name).join(", ")}
                <span style={{ marginLeft: "4rem" }}>
                  {data.runtime && `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}min`}
                </span> 
              </p>
              <div className="icons-row">
                <FetchRating vote_average={data.vote_average}/>
              </div>
              <p>Description: {data.overview}</p>
              <p>Release date: {data.release_date || data.first_air_date}</p>
              <div className="all-reviews">
                <h2>User Reviews</h2>
                {Array.isArray(movieReviews) && movieReviews.length > 0 ? (
                  movieReviews.map(r => (
                    <div key={r.idreviews} className="review-item">
                      <p><strong>user{r.idaccount}</strong> rated {r.rating}/5</p>
                      <p>{r.review}</p>
                      <p className="review-date">{r.date}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet for this title.</p>
                )}
              </div>
            </div>

            <div className="titleinfo-right">
              {data.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={data.title || data.name}
                />
              )}
            </div>
          </div>
      </div>
    );
  }
};


export default TitleItems;