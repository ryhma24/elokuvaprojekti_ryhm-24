import { useAuth } from "../contexts/AuthContext.jsx";
import React from "react";
import { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import { currentUser } from "../middleware/currentUser.jsx";
import { useNavigate } from 'react-router-dom'


function Profile() {
    const navigate = useNavigate();
    const [favourites, setFavourites] = useState([])
    const {user, accessToken, idaccount, getDeletionDate, deletionDate, deletionFlag, getDeletionFlag} = useAuth()
    const [movieDetails, setMovieDetails] = useState([])
    const [accStatus, setAccStatus] = useState("Normal")
    const [selectedIcon, setSelectedIcon] = useState(0) //placeholderi value
    const [fetchedAvatarIndex, setIndex] = useState("")
    const [currentAvatar, setCurrentAvatar] =useState("")
    const [currentAvatarCleaned, setCurrentAvatarCleaned] =useState("")
    


    useEffect(() => {
        async function fetchFavourites() {
            if (!accessToken) return;
            const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/favourites/${idaccount}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            const data = await res.json();
            setFavourites(data);
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
                    const moviedata = await apiCall.json()
                    return moviedata
                })
            );
            setMovieDetails(results);
        }
        if(accessToken)
        {
        fetchAvatar()
        setAvatar();
        getDeletionDate();
        CheckStatus();
        }
        fetchFavourites();
    }, [accessToken, idaccount, deletionDate, deletionFlag, fetchedAvatarIndex]);
    function copyUrl() {
        alert("URL copied to clipboard")
        const shareUrl = `http://localhost:5173/favourites/${idaccount}`
        navigator.clipboard.writeText(shareUrl)
    }
    
    async function CheckStatus()
    {   
        if(deletionDate && deletionDate.length > 0)
        {
            setAccStatus("Pending deletion")
        }
    }

   async function chooseAvatar(e) 
   {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/setavatar`, {
      method: "PUT",
      headers: {
          "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json" 
        },
      credentials: "include",
      body: JSON.stringify({ username: user, idavatar: selectedIcon }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "icon change failed");
    }
    fetchAvatar()
    setAvatar();
   }

   function setAvatar()
   {
    const icons = ["wxrxy8ZG/crying", "XJ7NFVnP/dead", "wjX9Gtvr/lemon", "h4Y4zW6v/star", "mkPbX8zP/suspicious", "Tw7dJZw1/wink", "d0FVs2pJ/yum", "SxFydLyW/smile"];
    setCurrentAvatar(icons[fetchedAvatarIndex]);
   }

   async function fetchAvatar()
   {
     if (!accessToken) return;
            const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/getavatar/${user}`, {
            });
            const data = await res.json();
            const index = JSON.stringify(data[0].idavatar)  
            setIndex(index)
            setAvatar();
   }
 


    return (
        <div>
            <NavBar />
        <div className="profilecontainer">
            <div className="baseinfo">
                <h2>Account info:</h2>
            <div className="infosplit">
                <p>your username: {currentUser()}</p>
                <p>Account status: {accStatus}</p>
                <img src={`https://i.postimg.cc/${currentAvatar}.png`} width="128" height="128"></img>
            <form onSubmit={chooseAvatar}>
                <select 
                value={selectedIcon} 
                onChange={e => setSelectedIcon(e.target.value)}>
                
                    <option value="selectedIcon" disabled>Choose your avatar</option>
                    <option value="0">Crying</option>
                    <option value="1">Dead</option>
                    <option value="2">Lemon</option>
                    <option value="3">Star</option>
                    <option value="4">Sus</option>
                    <option value="5">Wink</option>
                    <option value="6">Yum</option>
                    <option value="7">smile</option>
                </select>
                <button type="submit">Submit</button>
            </form>
            </div>

            </div>
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
    </div>
    )
}

export default Profile;