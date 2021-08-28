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
  
  let componentToRender = <></>;

  if (error) {
    componentToRender = <Error />
  } else if (loading) {
    componentToRender = <Spinner />
  } else if (album) {
    componentToRender = <AlbumDetail album={album} />
  }
  return(
    <>
      <Link to='/' className='btn'> {backButtonText} </Link>
      {componentToRender}
    </>
  );
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
}

function AlbumDetail({ album }) {
  const { 
    name = '', 
    label = '', 
    total_tracks: totalTracks = 0, 
    tracks = {},
    external_urls: externalUrls = {}
  } = album

  const spotifyUrl = externalUrls.spotify || ''

  console.info(`tracks for album ${name} are`, tracks)

  return(
  <div className="card-text">
    <h1>
      { name }
    </h1>
      <InfoBadges totalTracks={totalTracks} label={label} />
    <br />
    <p>
      Listen to the full versions of all tracks on Spotify!
    </p>
    {
      spotifyUrl && <ToSpotifyButton url={spotifyUrl} />
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
  );
}


AlbumDetail.propTypes = {
  albumDetail: PropTypes.shape({
    name: PropTypes.string.isRequired,
    total_tracks: PropTypes.number.isRequired,
    label: PropTypes.string,
    genres: PropTypes.array,
    tracks: PropTypes.shape({
      items: PropTypes.arrayOf(TrackItem.PropTypes).isRequired
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