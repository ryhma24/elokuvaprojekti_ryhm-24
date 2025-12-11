import { useState, useEffect } from 'react'
import { useAuth } from "../contexts/AuthContext.jsx";
import { FaStar, FaRegStar, FaStarHalfStroke } from 'react-icons/fa6'
import { useReview } from "../contexts/ReviewContext";

const StarRating = ({ movieId }) => {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const { accessToken, idaccount } = useAuth();
    const { reviewState, setReviewState } = useReview();
    const review = reviewState.find(r => r.idmovie === movieId);
    const idreviews = review?.idreviews;
    const currentRating = review?.rating || 0;
    const REACT_APP_API_URL = "http://localhost:3001"

    useEffect(() => {
        const existingReview = reviewState.find(r => r.idmovie === movieId);
        if (existingReview) {
        setRating(existingReview.rating);
        }
    }, [reviewState, movieId]);

    async function onRatingStarClick(currentRating){
        try {
            console.log("review",review)
            console.log("idreviews",idreviews)
            await fetch(`${REACT_APP_API_URL}/reviews/${idreviews}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    review: review?.review || "",
                    rating: currentRating,
                    idaccount,
                    idmovie: movieId,
                    date: new Date().toISOString()
                })
            });

            const updated = await res.json();

            setRating(currentRating);

            setReviewState(prev =>
            prev.map(r => r.idreviews === updated.idreviews ? updated : r)
            );
        
        } catch (err) {
            console.error("Error updating review:", err);
        }
    }

    return  <div className='rating'>
                <p className='ratingLabel'>Your Rating</p>
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    
                    return  <label key={ratingValue}>
                                <input 
                                    type="radio" 
                                    name="rating" 
                                    value={ratingValue} 
                                    onClick={()=> {
                                        setRating(ratingValue);
                                        onRatingStarClick(ratingValue);
                                    }}
                                />
                                <FaStar 
                                    id="FaStar" 
                                    color={ratingValue <= (hover || rating) ? "#daa520" : "#e4e5e9"}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </label>
                })}
            </div>
}

const FetchRating = ({vote_average}) => {   
    const rating = Math.round(vote_average / 2); 

    return (
        <div className="tooltip">
            <div className='ratingResult'>
                <p className='ratingResultLabel'>TMDB Rating</p>
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                        <FaStar
                            key={ratingValue}
                            id="FaStarResult"
                            color={ratingValue <= rating ? "#daa520" : "#e4e5e9"} 
                        />
                    )     
                })}
            </div>
            <span className="tooltiptext">
                {(vote_average / 2).toFixed(1)}/5
            </span>
        </div>
    )
}

export { StarRating, FetchRating }