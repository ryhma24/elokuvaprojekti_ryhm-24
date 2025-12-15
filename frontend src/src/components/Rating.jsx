import { useState, useEffect } from 'react'
import { useAuth } from "../contexts/AuthContext.jsx";
import { FaStar, FaRegStar, FaStarHalfStroke } from 'react-icons/fa6'
import { useReview } from "../contexts/ReviewContext";
import { formatToday } from '../middleware/date-formatter.js';

const StarRating = ({ typeLabel, movieId }) => {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [ismovie, setIsmovie ] = useState(null)
    const { accessToken, idaccount } = useAuth();
    const { reviewState, setReviewState } = useReview();
    const review = Array.isArray(reviewState)
        ? reviewState.find(r => r.idmovie === movieId)
        : undefined;
    const idreviews = review?.idreviews;
    const currentRating = review?.rating || 0;
    const [comment, setComment] = useState("");
    const REACT_APP_API_URL = "http://localhost:3001"

    useEffect(() => {
        if (Array.isArray(reviewState)) {
            const existingReview = reviewState.find(r => r.idmovie === movieId);
        
            if (existingReview) {
                setRating(existingReview.rating);
            }
        }
            if(typeLabel === "movie"){
                console.log("typeLabel", typeLabel)
                    setIsmovie(true)
                }else{
                    setIsmovie(false)
                }
    }, [reviewState, movieId, typeLabel]);

    

    async function onRatingStarClick(currentRating){
        try {
            console.log("idreviews",idreviews)
            const url = idreviews
                ? `${REACT_APP_API_URL}/reviews/${idreviews}`
                : `${REACT_APP_API_URL}/reviews`;

            const method = idreviews ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    review: review?.review || "",
                    rating: currentRating,
                    idaccount: idaccount,
                    idmovie: movieId,
                    date: formatToday(),
                    ismovie: ismovie
                })
            });

            const updated = await res.json();
            //console.log("typeLabel", typeLabel)
            //console.log("ismovie", ismovie)
            
  
            setReviewState(prev => {
                if(idreviews) {
                    return prev.map(r =>
                        r.idreviews === idreviews
                        ? { ...r, ...updated, rating: currentRating }
                        : r
                    )
                } else {
                    return [...prev, { ...updated, rating: currentRating }];
                }
            });
   
        
        } catch (err) {
            console.error("Error updating review:", err);
        }
    }

    

    return  <div className='rating'>
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

const MakeAComment = ({ movieId, typeLabel }) => {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [comment, setComment] = useState("");
    const [ismovie, setIsmovie ] = useState(null)
    const { accessToken, idaccount } = useAuth();
    const { reviewState, setReviewState } = useReview();
    const { user } = useAuth();
    const review = Array.isArray(reviewState)
        ? reviewState.find(r => r.idmovie === movieId)
        : undefined;
    const idreviews = review?.idreviews;
    const REACT_APP_API_URL = "http://localhost:3001"

    useEffect(() => {
        if(typeLabel === "movie"){
                setIsmovie(true)
            }else{
                setIsmovie(false)
            }
        
    }, [reviewState, movieId]);

    const onReviewSubmit = async (e) => {
        try {
            const url = idreviews
                ? `${REACT_APP_API_URL}/reviews/${idreviews}`
                : `${REACT_APP_API_URL}/reviews`;

            const method = idreviews ? "PUT" : "POST";
            console.log("post body:", {
                review: comment,
                    rating: rating || 0,
                    idaccount: idaccount,
                    idmovie: movieId,
                    date: formatToday(),
                    ismovie: ismovie
            })
            const res = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    review: comment,
                    rating: rating || 0,
                    idaccount: idaccount,
                    idmovie: movieId,
                    date: formatToday(),
                    ismovie: ismovie
                })
            });

            const updated = await res.json();
            console.log("POST response:", updated);

            setReviewState(prev =>
                idreviews
                ? prev.map(r => r.idreviews === updated.idreviews ? updated : r)
                : [...prev, updated]
            );

            setComment("");
        
        } catch (err) {
            console.error("Error updating or posting review:", err);
        }
    }

    return (
        <div>
            <div className='reviewrating'>
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    
                    return  <label key={ratingValue}>
                                <input 
                                    type="radio" 
                                    name="rating" 
                                    value={ratingValue} 
                                    onClick={()=> {
                                        setRating(ratingValue);
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
            <form onSubmit={onReviewSubmit}>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your review..."
                />
                
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export { StarRating, FetchRating, MakeAComment }