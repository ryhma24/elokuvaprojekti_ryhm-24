import React from 'react'
import "./SearchResult.css"

export const SearchResult = ({result}) => {
  const displayTitle = result.title || result.name;
  const displayDate = result.release_date || result.first_air_date;
  const typeLabel = result.release_date ? "Movie" : result.first_air_date ? "TV" : "";

  return (
      <div className="search-result" onClick={(e) => {/*Function here*/}}>
        <img className ="searchimage"  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} alt={displayTitle} />
        <section class="wrapper">
            <strong>{displayTitle}</strong>
            <label id="search-date">{displayDate?.slice(0, 4)}</label>
            <label id="type">{typeLabel}</label>
        </section>
      </div>
  )
}