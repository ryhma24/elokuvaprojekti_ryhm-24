import { useState } from "react";
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResultslist';

function NavBar() {

    const [results, setResults] = useState([]);

    return (

        <nav className="navbar">

            <div className="navbar-links">
                <a className="nav-link">Home</a>
                <a className="nav-link">Movies</a>
                <a className="nav-link">Series</a>
                <a className="nav-link">Groups</a>
            </div>
            <div className="search-bar-container">
                <SearchBar setResults={setResults}/>
                <SearchResults results={results}/>
                
            </div>
            <button>Login</button>
        </nav>


    )
}

export default NavBar;
