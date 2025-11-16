import { useState } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar.jsx'
import { SearchResults } from './components/SearchResultsList.jsx';

const url = "http://localhost:3001"

function App() {
    const [results, setResults] = useState([]);
    
    return (
        <div className="App">
            <div className="search-bar-container">
                <h3>Search Movie Test</h3>
                <SearchBar setResults={setResults}/>
                <SearchResults results={results} />
            </div>
        </div>
    )
}

export default App