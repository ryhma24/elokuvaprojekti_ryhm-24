import { useAuth } from "../contexts/AuthContext.jsx";
import React from "react";
import { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import { currentUser } from "../middleware/currentUser.jsx";
import { useNavigate } from 'react-router-dom'

function Profile() {
    const navigate = useNavigate();
    const [favourites, setFavourites] = useState([])
    const { accessToken, idaccount } = useAuth()
    const [movieDetails, setMovieDetails] = useState([])


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
    function copyUrl() {
        alert("URL copied to clipboard")
        const shareUrl = `http://localhost:5173/favourites/${idaccount}`
        navigator.clipboard.writeText(shareUrl)
    }


    return (
        <div>
            <NavBar />
            <div className="favMovieListContainer">
                <h2 className="big-titles">Your Favourite Movies and Series</h2>
                <ul className="favlist">
                    {movieDetails.map((fav) => {
                        const type = fav.title ? "movie" : "tv";
                        return <li key={fav.id} >
                            <img className="profile-movie" onClick={() => navigate(`/${type}/title/${fav.id}`)}
                                src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`}
                                alt={fav.title || fav.name} />
                            {fav.title || fav.name}
                        </li>
                    })}
                </ul>
                <h3 className="shareList" onClick={copyUrl}>Click to share your list</h3>
            </div>

        </div>
    )
}

export default Profile;