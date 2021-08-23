import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import TrackItem from './Track'
import { getOneAlbum } from './albumUtils'


function Album({ match }) {
  const albumId = match.params.id
  const [album, setAlbum] = useState()

  useEffect(() => {
    if (!albumId) return;
    getOneAlbum(albumId)
      .then(setAlbum)
      .catch(err => console.err(err))
  }, [albumId])

  if (!album) {
    return <></>
  }  
  const { 
    name = '', 
    label = '', 
    total_tracks: totalTracks = 0, 
    tracks = {},
    external_urls: externalUrls
  } = album
 
  const spotifyUrl = externalUrls.spotify || ''
  const backButtonText = '<< Back to Search'
  console.log(`tracks for album ${name} are`, tracks)

  return(
    <div className="card-text">
      <Link to='/' className='btn'> {backButtonText} </Link>
      <h1>
        { name }
      </h1>
      { <InfoBadges totalTracks={totalTracks} label={label} /> }
      <br />
      <p>
        Listen to the full versions of all tracks on Spotify!
      </p>
      {
        spotifyUrl &&
        <ToSpotifyButton url={spotifyUrl} />
      }
      <br />
      <br />
      { 
        tracks && 
        tracks.items && 
        tracks.items.length > 0 &&
        tracks.items.map(track => <TrackItem key={track.id} track={track} /> )
      }
    </div>
  )
}

Album.propTypes = {
  setAlbum: PropTypes.func.isRequired,
  albumDetail: PropTypes.shape({
    name: PropTypes.string.isRequired,
    total_tracks: PropTypes.number.isRequired,
    label: PropTypes.string,
    genres: PropTypes.array,
    tracks: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object).isRequired
    }).isRequired,
    external_urls: PropTypes.shape({
      spotify: PropTypes.string
    }),
  }),

}

const InfoBadges = ({ totalTracks, label}) => (
  <ul>
    {
      totalTracks &&
      <div className="badge bg-info">
        <b> total tracks </b> {totalTracks} 
      </div>
    }
    {
      label &&
      <div className="badge bg-info">
        <b> label </b> {label}
      </div>
    }
  </ul>
)

const ToSpotifyButton = ({url}) => (
  <>
    {
      url &&
      <a href={url} className="btn btn-dark">Go to Spotify</a>
    }
  </>
)


export default Album