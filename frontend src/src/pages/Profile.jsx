import { useAuth } from "../contexts/AuthContext.jsx";
import React from "react";
import { useState, useEffect } from "react"
import NavBar from "../components/NavBar"

const Profile = () => {
    const [favourites, setFavourites] = useState([])
    const { accessToken, idaccount } = useAuth()

useEffect(() => {


    async function fetchFavourites() {
        if (!accessToken) return;
        const res = await fetch(`http://localhost:3001/favourites/${idaccount}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const data = await res.json();
        console.log("Favourites from backend:", data);
        
        setFavourites(data); 
    }
console.log("ACCESS TOKEN:", accessToken);
    fetchFavourites();
}, [accessToken, idaccount]);

    return (
    <div>
        <NavBar/>
        <h2>Your Favourite Movie IDs</h2>
            <ul>
            {favourites.map((fav) => (
          <li key={fav.idfavourites}>{fav.movieid}</li>
        ))}
        </ul>
                    
    </div>
)
}

export default Profile;