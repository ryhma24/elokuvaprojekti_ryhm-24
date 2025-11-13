import React from 'react'
import "./SearchResult.css"

export const SearchResult = ({result}) => {
  return (
    <div className="search-result" onClick={(e) => {/*Function here*/}}>
        <strong>{result.title}</strong> ({result.release_date?.slice(0, 4)})
        {/*<img src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} alt={result.title} />*/}
    </div>
  )
}