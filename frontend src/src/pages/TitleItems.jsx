import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useFavourites } from "../contexts/FavouritesContext";
import { useReview } from "../contexts/ReviewContext";
import { FavouritesButton } from "../components/Favourites";
import { FetchRating, StarRating } from "../components/Rating"
import { useAuth } from "../contexts/AuthContext.jsx";




const TitleItems({favouriteState, setFavouriteState}) => {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const { favouriteState, setFavouriteState } = useFavourites();
  const { reviewState, setReviewState } = useReview();
  const { accessToken } = useAuth();


 
  useEffect(() => {
    const getTitleInfo = async () => {
      const apiKey1 = import.meta.env.VITE_API_KEY;
      console.log("API KEY:ss", import.meta.env.VITE_API_KEY);
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

  if (!data) return <p>Loading...</p>;

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
                <FetchRating vote_average={data.vote_average}/>
                <StarRating movieId={data.id}/>
                <FavouritesButton
                  typeLabel={type}
                  movieId={Number(id)}
                  favouriteState={favouriteState}
                  setFavouriteState={setFavouriteState}
                />
              </div>
              <p>Description: {data.overview}</p>
              <p>Release date: {data.release_date || data.first_air_date}</p>
              <div className="review">
                <button className="addreview-btn">
                Add Review
              </button>
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