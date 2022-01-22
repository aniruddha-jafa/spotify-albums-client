import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

import { getArtistId } from '../utils/albumUtils'

type Props = {
  artistId: string, 
  setArtistId: React.Dispatch<React.SetStateAction<string>>
}


Search.propTypes = {
  artistId: PropTypes.string,
  setArtistId: PropTypes.func.isRequired
}

export default function Search({ artistId, setArtistId }: Props ) {
  const [artistName, setArtistName] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if (!artistName) return; 
    getArtistId(artistName)
      .then(id => setArtistId(id))
      .catch(err => console.error(err))
  }, [artistName, setArtistId])


  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!searchText) return;
    setArtistName(searchText)
    console.info('Have set artist name to:', artistName)
  }

  const onChange: React.ChangeEventHandler<HTMLInputElement>  = (e) =>  {
    setSearchText(e.target.value)
  }

  const clearArtist: React.MouseEventHandler<HTMLButtonElement> = () => {
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
          className="btn btn-light wide-block"
        />
        <button type="submit" value="search" className="btn wide-block btn-dark">
          Search
        </button>
      </form>
      {
        artistId &&
      <button className='btn btn-light btn-warn' onClick={clearArtist}>
        Clear
      </button>
      }
    </>
  )
}
