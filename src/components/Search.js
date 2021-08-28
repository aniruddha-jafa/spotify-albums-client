import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

import { getArtistId } from './../utils/albumUtils'

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

  const clearArtist = () => {
    setArtistId('')
    setArtistName('')
    setSearchText('')
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="artist"
          onChange={onChange}
          value={searchText}
          placeholder="Search an artist..."
          className="btn wide-block btn-light"
        />
        <button type="submit" value="search" className="btn wide-block btn-dark">
          Search
        </button>
      </form>
      {
        artistName && (
      <button className='btn btn-light' onClick={clearArtist}>
        Clear
      </button>
      )}
    </>
  )
}

Search.propTypes = {
  setArtistId: PropTypes.func.isRequired
}

export default Search