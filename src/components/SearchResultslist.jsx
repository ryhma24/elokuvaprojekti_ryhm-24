import React from 'react'

import { SearchResult } from './SearchResult'

export const SearchResults = ({results}) => {
  return (
    <div className="results-list">
        {results.map((result, id) => {
                return <SearchResult result={result} key={id} />
        })}
    </div>
  )
}