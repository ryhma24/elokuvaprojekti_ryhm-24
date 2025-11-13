import React from 'react'
import { useState } from 'react'
import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"

export const SearchBar = ({ setResults }) => {

    const [search, setSearch] = useState("")
    
    const searchMovie = async (value) => { 
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(value)}&api_key=${import.meta.env.VITE_API_KEY}`
            )
            const data = await response.json()
            setResults(data.results || [])
        } catch (error) {
            console.error('Error fetching movie data:', error)
        }
    }

    const handleChange = (value) => {
        setSearch(value)
        searchMovie(value)
    }

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input placeholder='Search for a movie...' value={search} onChange={(e) => handleChange(e.target.value)}/>
        </div>
    )
}
