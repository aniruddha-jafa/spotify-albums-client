import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import TrackItem from './Track'
import Spinner from './../loading/Spinner'

import { getOneAlbum } from './../../utils/albumUtils'
import { useFetcher } from './../../utils/hooks'


function Album({ match }) {
  const albumId = match.params.id
  const { loading, data: album, error } = useFetcher(getOneAlbum, albumId)

  const Error = () => (<pre>{JSON.stringify(error, null, 2)}</pre>)
  const backButtonText = '<< Back to Search'
  
  let ComponentToRender = () => <></>;

  if (error) {
    ComponentToRender = <Error />
  } else if (loading) {
    ComponentToRender = <Spinner />
  } else if (album) {
    ComponentToRender = <AlbumDetail album={album} />
  }
  return(
    <>
      <Link to='/' className='btn'> {backButtonText} </Link>
      {ComponentToRender}
    </>
  );
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