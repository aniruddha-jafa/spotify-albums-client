import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

import { getArtistId } from './album/albumUtils'

function Search({ setArtistId }) {
  const [artistName, setArtistName] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if (!artistName) return; 
    getArtistId(artistName)
      .then(setArtistId)
      .catch(err => console.error(err))
  }, [artistName, setArtistId])


  const onSubmit = e => {
    e.preventDefault()
    if (!searchText) return;
    setArtistName(searchText)
    console.info('Have artist name to:', searchText)
  }

  const onChange = e => setSearchText(e.target.value)

  return (
    <>
      <form onSubmit={onSubmit} onChange={onChange}>
        <input
          type="text"
          name="artist"
          placeholder="Search an artist..."
          className="btn wide-block btn-light"
        />
        <button type="submit" value="search" className="btn wide-block btn-dark">
          Search
        </button>
      </form>
    </>
  )
}

Search.propTypes = {
  setArtistId: PropTypes.func.isRequired
}

export default Search