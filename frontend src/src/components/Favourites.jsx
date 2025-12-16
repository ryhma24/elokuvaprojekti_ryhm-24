import { useState, useEffect } from 'react'
import { useAuth } from "../contexts/AuthContext.jsx";
import { FaHeart, FaRegHeart } from 'react-icons/fa'

export const FavouritesButton = ({ typeLabel, movieId, favouriteState, setFavouriteState }) => {
    const { accessToken, idaccount } = useAuth();
    const REACT_APP_API_URL = "https://elokuvaprojekti-ryhm-24-api-xo2h.onrender.com"
    const [ismovie, setIsmovie ] = useState(null)
    
    const [isFavourite, setIsFavourite] = useState(false);
    
    useEffect(() => {
        if(typeLabel === "movie"){
                setIsmovie(true)
            }else{
                setIsmovie(false)
            }
        if (Array.isArray(favouriteState) && favouriteState.includes(movieId)) {
            setIsFavourite(true);
        } else {
            setIsFavourite(false);
        }
    }, [favouriteState, movieId]);

    async function onFavouriteClick(){
        try {
            if(!isFavourite) {
                await fetch(`${REACT_APP_API_URL}/favourites/addfavourite`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({ idaccount, movieId ,ismovie})
        
                })
                console.log(movieId)
                setFavouriteState(prev => [...prev, movieId]);
            } else {
                await fetch(`${REACT_APP_API_URL}/favourites/deletefavourite`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json",
                                "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({ idaccount, movieId })
                
                });
                console.log(idaccount)
                setFavouriteState(prev => prev.filter(id => id !== movieId));
            }
        
        } catch (err) {
            console.error("Error updating favourite:", err);
        }
    }
        
        //alert("clickewd")
    
    return (
        <button className="favourite-btn" onClick={onFavouriteClick}>
            {isFavourite ? (
                <FaHeart id="FaHeart" />
            ) : (
                <FaRegHeart id="FaRegHeart" />
            )}
        </button>
    )
}
