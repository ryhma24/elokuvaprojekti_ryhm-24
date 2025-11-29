import { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

export const FavouritesButton = () => {
    const [isFavourite, setIsFavourite] = useState(false);

    function onFavouriteClick(){
        setIsFavourite(!isFavourite)
        //alert("clickewd")
    }
    
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
