import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

import { getArtistId } from './album/albumUtils'

function Search({ setArtistId }) {
  const [artistName, setArtistName] = useState("")

  useEffect(() => {
    if (!artistName) {
      return
    }
    getArtistId(artistName)
      .then(id => setArtistId(id))
      .catch(err => console.error(err))
  }, [artistName, setArtistId])


  const onSubmit = e => {
    e.preventDefault()
    const artistName = "Coldplay" // hardcode for now
    console.info('Setting artist name to:', artistName)
    setArtistName(artistName)
  }
  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          name="artist"
          placeholder="Search an artist..."
          className="btn wide-block btn-light"
        />
        <button type="submit" className="btn wide-block btn-dark">
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