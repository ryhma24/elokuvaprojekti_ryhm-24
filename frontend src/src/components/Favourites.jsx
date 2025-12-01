import { useState, useEffect } from 'react'
import { useAuth } from "../contexts/AuthContext.jsx";
import { FaHeart, FaRegHeart } from 'react-icons/fa'

export const FavouritesButton = ({ movieId, idaccount, favouriteState, setFavouriteState }) => {
    const { accessToken, user } = useAuth();
    const REACT_APP_API_URL = "http://localhost:3001"

    const [isFavourite, setIsFavourite] = useState(false);
    
    useEffect(() => {
        if (favouriteState.includes(movieId)) {
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
                    headers: { "Content-Type": "application/json",
                                "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({ idaccount, movieId }),
                    favourites: movieId,
                    idaccount: 1
                })
                setIsFavourite(true);
            } else {
                await fetch(`${REACT_APP_API_URL}/favourites/deletefavourite`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json",
                                "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({ idaccount, movieId }),
                    favourites: movieId,
                    idaccount: 1
                });
                setIsFavourite(false);
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
