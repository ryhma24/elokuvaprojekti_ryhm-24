import React from 'react'

import { SearchResult } from './SearchResult'
import { GroupSearchResult } from './GroupSearchResult'

const SearchResults = ({results}) => {
    const sorterResults = [...results].sort((a,b) => b.vote_count - a.vote_count)
  return (
    <div className="results-list">
        {sorterResults.map((result, id) => {
                return <SearchResult result={result} key={id} />
        })}
    </div>
  )
}

const GroupSearchResults = ({results}) => {
    const sorterResults = [...results].sort((a,b) => b.vote_count - a.vote_count)
  return (
    <div className="results-list">
        {sorterResults.map((result, id) => {
                return <GroupSearchResult result={result} key={id} />
        })}
    </div>
  )
}

export { SearchResults, GroupSearchResults }