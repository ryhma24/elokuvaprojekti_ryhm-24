import React from 'react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export const GroupSearchBar = ({ setResults }) => {

    const [search, setSearch] = useState("")
    
    const searchMovie = async (value) => { 
        try {

            const urls = [
                `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(value)}&api_key=${import.meta.env.VITE_API_KEY}`,
                `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(value)}&api_key=${import.meta.env.VITE_API_KEY}`
            ];

            const getFetch = async (url) => {
                const res = await fetch(url);
                return res.json();
            };

            const responses = await Promise.all(urls.map((url) => getFetch(url)));

            console.log(responses);

            const combined = responses.flatMap(r => r.results || []);

            setResults(combined);

        } catch (error) {
            console.error('Error fetching movie data:', error)
        }
    }

    const handleChange = (value) => {
        setSearch(value)
        searchMovie(value)
    }

    return (
        <div className="group-input-wrapper">
            <FaSearch id='fa-search' style={{ color: "#2c2b2b" }}/>
            <input placeholder='Add a movie...' value={search} onChange={(e) => handleChange(e.target.value)}/>
        </div>
    )
}