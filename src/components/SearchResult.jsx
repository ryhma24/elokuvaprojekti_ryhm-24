import React from 'react'
import "./SearchResult.css"

export const SearchResult = ({result}) => {
  return (
      <div className="search-result" onClick={(e) => {/*Function here*/}}>
        <img className ="searchimage"  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} alt={result.title} />
        <section class="wrapper">
            <strong>{result.title}</strong>
            <label id="search-date">{result.release_date?.slice(0, 4)}</label>
        </section>
      </div>
  )
}