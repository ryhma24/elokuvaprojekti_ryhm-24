import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useFavourites } from "../contexts/FavouritesContext";
import { useReview } from "../contexts/ReviewContext";
import { FavouritesButton } from "../components/Favourites";
import { FetchRating, StarRating, MakeAComment, CommentStars } from "../components/Rating"
import { useAuth } from "../contexts/AuthContext.jsx";
import { fetchAvatar } from "../middleware/fetchAvatar.jsx";


import crying from '/src/icons/crying.png'
import dead from '/src/icons/dead.png'
import lemon from '/src/icons/lemon.png'
import star from '/src/icons/star.png'
import sus from '/src/icons/suspicious.png'
import wink from '/src/icons/wink.png'
import yum from '/src/icons/yum.png'

const TitleItems = () => {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const { favouriteState, setFavouriteState } = useFavourites();
  const { reviewState, movieReviews, fetchReviewsByMovieId } = useReview();
  const { accessToken, user } = useAuth();
  const [showCommentForm, setShowCommentForm] = useState(false);
  
  const [fetchedAvatarIndex, setIndex] = useState("")
  const [currentAvatar, setCurrentAvatar] =useState("")

  async function deleteComment(idreviews, username, idmovie) 
  {
    if(username === user){
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/reviews/${idreviews}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
          "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json" 
        },
    });
    console.log("deletecomment respone on: " + JSON.stringify(res))
    fetchReviewsByMovieId(idmovie);

     return;
   }
    alert("You can delete your own comments only!")
  }

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
                  {showCommentForm 
                    ? "Close" 
                    : userReview 
                      ? "Edit Review" 
                      : "Add Review"}
                </button>

                {showCommentForm && (
                  <div className="popup">
                    <MakeAComment
                      typeLabel={type}
                      movieId={data.id} />
                  </div>
                )}
              </div>
              <div className="all-reviews">
                <h2>User Reviews</h2>
                {Array.isArray(movieReviews) && movieReviews.length > 0 ? (
                  movieReviews.map(r => (

                    <div key={r.idreviews} className="review-item">
                     
                      <section className="userinfoicon">
                      <img id="usericon" src={`https://i.postimg.cc/SxFydLyW/smile.png`} width="68" height="68"></img>
                      </section>
                       <section className="userinfotext">
                          <p className="text"><strong>{r.username}</strong> rated</p>
                          <CommentStars rating={r.rating}/>
                      
                          <p>{r.date}</p>
                          </section>
                      <section className="commentcontainer">
                      <p className="comment">{r.review}</p>
                      <button onClick={() => {deleteComment(r.idreviews, r.username, r.idmovie)}}>Delete comment</button>
                      </section>
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
                     
                      <section className="userinfoicon">
                        <img id="usericon" src={`/src/icons/${r.idavatar}.png`} width="68" height="68"></img>
                      </section>
                       <section className="userinfotext">
                          <p className="text"><strong>{r.username}</strong> rated</p>
                          <CommentStars rating={r.rating}/>
                      
                          <p>{r.date}</p>
                          </section>
                      <p className="text">{r.review}</p>
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