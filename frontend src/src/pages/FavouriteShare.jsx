import { useParams } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react"
import NavBar from "../components/NavBar"

const FavouriteShare = () => {
    
    const [movieDetails, setMovieDetails] = useState([])
    const { id } = useParams()
    console.log("Public favourites for id:", id);  
    useEffect(() => {
        async function fetchFavourites() {
            
            const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/favourites/${id}`)
            const data = await res.json();
            console.log("Favourites:", data);
            
            console.log(data)
           

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
        console.log("ACCESS TOKEN:", );

        fetchFavourites();
    }, []);



    return (
        <div>
            <NavBar />
            <div className="favMovieListContainer">
                <h2 className="big-titles">Favourite list</h2>
                
                <ul className="favlist">
                    {movieDetails.map((fav) => (
                        <li key={fav.id}>
                            <img className="profile-movie" src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`} alt={movieDetails?.title || movieDetails?.name} />
                            {fav.title || fav.name}
                        </li>
                    ))}
                </ul>
            </div>
            
        </div>
    )
}

export default FavouriteShare