import React from 'react'

import { SearchResult } from './SearchResult'

export const SearchResults = ({results}) => {
    const sorterResults = [...results].sort((a,b) => b.vote_count - a.vote_count)
  return (
    <div className="results-list">
        {sorterResults.map((result, id) => {
                return <SearchResult result={result} key={id} />
        })}
    </div>
  )
}