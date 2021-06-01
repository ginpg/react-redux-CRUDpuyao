import React from 'react'

// Redirection
import { useHistory } from 'react-router-dom'

// Styles
import '../../../styles/Style.css'
import './searchBar.css'

const SearchBar = ({ searchQuery, setSearchQuery, action }) => {
  const history = useHistory()

  const onSubmit = e => {
    history.push(`?s=${searchQuery}`)
    e.preventDefault()
  }

  return (
    <>
      <form action={action} method="get" autoComplete="off" onSubmit={onSubmit} className="form-inline">
        <label htmlFor="header-search">
          <span className="visually-hidden">Search</span>
        </label>

        <input
          value={searchQuery}
          onInput={e => setSearchQuery(e.target.value)}
          type="text"
          id="header-search"
          placeholder="Search"
          name="searchDiscovery"
          className="mr-sm-2 form-control"
        />

        <button className="btn btn-outline-info" type="submit">
          Search
        </button>
      </form>
    </>
  )
}

export default SearchBar
