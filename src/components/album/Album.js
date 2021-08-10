import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

function Album({ albumDetail, getAlbum, match }) {

  const { name, label, total_tracks: totalTracks, tracks } = albumDetail
  const albumId = match.params.id
  const backButtonText = '<< Back to Search'

  useEffect(() => getAlbum(albumId), [getAlbum, albumId])
  
  const InfoBadges = ({ totalTracks, label }) => (
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
        <p> {track.name} </p>
        {
          track.is_playable &&
          <audio controls>
            <source src={track.preview_url}/>
          </audio>
        }
      </div>
    )

  const ToSpotifyButton = () => (
    <>
      {
        albumDetail.external_urls &&
        albumDetail.external_urls.spotify &&
        <a href={albumDetail.external_urls.spotify} className="btn btn-dark">Go to Spotify</a>
      }
    </>
  )

  return(
    <div className="card-text">
      <Link to='/' className='btn'> {backButtonText} </Link>
      <h1>{ name }</h1>
      <InfoBadges totalTracks={totalTracks} label={label} />
      <br />
      <p>
        Listen to the full versions of all tracks on Spotify!
      </p>
      <ToSpotifyButton />
      <br />
      <br />
      { tracks && tracks.items && tracks.items.map(track => <TrackItem key={track.id} track={track} /> ) }
    </div>
  )
}


const trackType = {
  name: PropTypes.string.isRequired,
  artists: PropTypes.array.isRequired,
  duration_ms: PropTypes.number.isRequired,
  is_playable: PropTypes.bool.isRequired,
  popularity: PropTypes.number,
  preview_url: PropTypes.string,
}

Album.propTypes = {
  getAlbum: PropTypes.func.isRequired,
  albumDetail: PropTypes.shape({
    name: PropTypes.string.isRequired,
    total_tracks: PropTypes.number.isRequired,
    label: PropTypes.string,
    genres: PropTypes.array,
    tracks: PropTypes.shape({
      items: PropTypes.arrayOf(trackType).isRequired
    }).isRequired,
    external_urls: PropTypes.shape({
      spotify: PropTypes.string
    }),
  }),

}


export default Album