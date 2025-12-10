import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { FaStar, FaRegStar, FaStarHalfStroke } from 'react-icons/fa6'
import { FaLessThanEqual } from 'react-icons/fa';

const StarRating = () => {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

    return  <div className='rating'>
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;

                    return  <label>
                                <input 
                                    type="radio" 
                                    name="rating" 
                                    value={ratingValue} 
                                    onClick={()=>setRating(ratingValue)}
                                />
                                <FaStar 
                                    id="FaStar" 
                                    
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
                            key={i}
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