import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useGroups } from "../contexts/GroupsContext";

export const GroupSearchResult = ({result}) => {
  const { addMovieToGroup } = useGroups();

  const displayTitle = result.title || result.name;
  const displayDate = result.release_date || result.first_air_date;
  const typeLabel = result.release_date ? "movie" : result.first_air_date ? "tv" : "";

  return (
      <div className="search-result" onClick={() => addMovieToGroup({
            id: result.id,
            title: displayTitle,
            poster: result.poster_path,
            type: typeLabel,
            year: displayDate?.slice(0, 4)
        })}
      >
        <img className ="searchimage"  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} alt={displayTitle} />
        <section className="wrapper">
            <strong>{displayTitle}</strong>
            <label id="search-date">{displayDate?.slice(0, 4)}</label>
            <label id="type">{typeLabel}</label>
        </section>
      </div>
  )
}