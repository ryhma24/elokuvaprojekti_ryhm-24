import React from 'react'
import { useNavigate } from 'react-router-dom';

export const SearchResult = ({result}) => {
  const navigate = useNavigate();

  const displayTitle = result.title || result.name;
  const displayDate = result.release_date || result.first_air_date;
  const typeLabel = result.release_date ? "movie" : result.first_air_date ? "tv" : "";

  return (
      <div className="search-result" onClick={(e) => {navigate(`/${typeLabel}/title/${result.id}`)}}>
        <img className ="searchimage"  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} alt={displayTitle} />
        <section className="wrapper">
            <strong>{displayTitle}</strong>
            <label id="search-date">{displayDate?.slice(0, 4)}</label>
            <label id="type">{typeLabel}</label>
        </section>
      </div>
  )
}