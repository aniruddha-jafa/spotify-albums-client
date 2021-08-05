import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

function Album({ albumDetail, getAlbum, match }) {
  const backButtonText = '<< Back to Search'
  const albumId = match.params.id
  const { name, artists, duration_ms, is_playable, tracks } = albumDetail
  useEffect(() => getAlbum(albumId), [getAlbum, albumId])
  return(
    <>
      <Link to='/' className='btn'>
        {backButtonText}
      </Link>
      <h1>{name}</h1>
      <p> Total tracks: {albumDetail.total_tracks}</p>
      <p> Duration in ms: {duration_ms} </p>
      { albumDetail.label && <p> label: {albumDetail.label} </p>}
      { tracks.items.map(track => <p> {track.name } </p>)}
    </>
  )
}

const trackType = {
  name: PropTypes.string.isRequired,
  artists: PropTypes.array.isRequired,
  duration_ms: PropTypes.number.isRequired,
  is_playable: PropTypes.bool.isRequired,
  popularity: PropTypes.number,
  preview_url: PropTypes.string,
  external_urls: PropTypes.shape({
    spotify: PropTypes.string
  }),
}

Album.propTypes = {
  getAlbum: PropTypes.func.isRequired,
  albumDetail: PropTypes.shape({
    name: PropTypes.string.isRequired,
    total_tracks: PropTypes.number.isRequired,
    label: PropTypes.string,
    genres: PropTypes.array,
    tracks: PropTypes.shape({
      items: PropTypes.arrayOf(trackType)
    })
  }),
}






export default Album