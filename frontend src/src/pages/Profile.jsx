import { useAuth } from "../contexts/AuthContext.jsx";
import React from "react";
import { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import { currentUser } from "../middleware/currentUser.jsx";

const Profile = () => {
    const [favourites, setFavourites] = useState([])
    const { accessToken, idaccount } = useAuth()
    const [movieDetails, setMovieDetails] = useState([])
    const [ownedGroups, setOwnedGroups] = useState([])

    useEffect(() => {
        async function fetchFavourites() {
            if (!accessToken) return;
            const res = await fetch(`http://localhost:3001/favourites/${idaccount}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            const data = await res.json();
            console.log("Favourites:", data);
            setFavourites(data);
            console.log("user:")
           

            const results = await Promise.all(
                data.map(async (item) => {
                    const type = item.ismovie ? "movie" : "tv";
                    const id = item.movieid;

                    const apiCall = await fetch(
                        `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
                        {
                            headers: {
                                Authorization: `Bearer ${import.meta.env.VITE_API_KEY2}`
                            }
                        }
                    );

                    const moviedata = await apiCall.json();

                    return moviedata
                })
            );
            setMovieDetails(results);
            console.log("movie detauils", results)
        }
        console.log("ACCESS TOKEN:", accessToken);

        fetchFavourites();
    }, [accessToken, idaccount]);



    return (
        <div>
            <NavBar />
            <div className="favMovieListContainer">
                <h2>Your Favourite Movies and Series</h2>
                <ul className="favlist">
                    {movieDetails.map((fav) => (
                        <li key={fav.id}>
                            <img className="profile-movie" src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`} alt={movieDetails?.title || movieDetails?.name} />
                            {fav.title || fav.name}
                        </li>
                    ))}
                </ul>
            </div>
            <h2>Groups owned by you</h2>
            <ul>

            </ul>
        </div>
    )
}

export default Profile;