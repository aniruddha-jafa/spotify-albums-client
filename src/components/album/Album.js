import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

import { getAlbum } from './albumUtils'

function Album({ albumDetail, setAlbum, match }) {
  const albumId = match.params.id
  useEffect(() => {
    if (!albumId) {
      return
    }
    getAlbum(albumId)
      .then(album => setAlbum(album))
      .catch(err => console.err(err))
  }, [albumId, setAlbum])

  if (!albumDetail) {
    return <></>
  }  
  const { 
    name = '', 
    label = '', 
    total_tracks: totalTracks = 0, 
    tracks = {},
    external_urls: externalUrls
  } = albumDetail
 
  const spotifyUrl = externalUrls && externalUrls.spotify
  const backButtonText = '<< Back to Search'
  console.log(`tracks for album ${albumDetail.name} are`, tracks)
  return(
    <div className="card-text">
      <Link to='/' className='btn'> {backButtonText} </Link>
      <h1>
        { name }
      </h1>
      {
        <InfoBadges totalTracks={totalTracks} label={label} />
      }
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

const TrackItem = ({ track }) => (
    <div className='wide-block'>
      <p> {track.name}, {track.duration_ms} </p>
      {/* {
        false && 
        track.is_playable &&
        <audio controls>
          <source src={track.preview_url}/>
        </audio>
      } */}
    </div>
  )

TrackItem.propTypes = {
  track: PropTypes.shape({
    name: PropTypes.string.isRequired,
    artists: PropTypes.array,
    duration_ms: PropTypes.number.isRequired,
    is_playable: PropTypes.bool.isRequired,
    popularity: PropTypes.number,
    preview_url: PropTypes.string,
  }).isRequired
}

const ToSpotifyButton = ({url}) => (
  <>
    {
      url &&
      <a href={url} className="btn btn-dark">Go to Spotify</a>
    }
  </>
)


export default Album