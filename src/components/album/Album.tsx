import PropTypes from 'prop-types'
import { isEmpty } from 'lodash' 

// components
import { Link } from 'react-router-dom'
import TrackItem from './Track'
import Spinner from '../loading/Spinner'
// functions & hooks
import { getOneAlbum } from '../../utils/albumUtils'
import { useFetcher } from '../../utils/hooks'

// types
import type { RouteComponentProps } from 'react-router-dom'
import type { Album as AlbumType, SimplifiedTrack, Paging} from 'spotify-types'

type TvalidMatch = {
  id: string
}

// RouteComponentProps<TvalidMatch>
export default function Album({ match }: RouteComponentProps<TvalidMatch>) {
  let albumId =  ''

  if (isEmpty(match)) {
    console.log('match is empty')
    // pass
  } else if (!match.params) {
    console.log('match params not available', match)
    // pass
  } else {
    albumId = match.params.id
    console.log('Have set albumId')
  }

  const { loading, data, error } = useFetcher<AlbumType>(getOneAlbum, albumId)

  const Error = () => (<pre>{JSON.stringify(error, null, 2)}</pre>)
  const backButtonText = '<< Back to Search'
  
  let componentToRender = <></>;

  if (error) {
    componentToRender = <Error />
  } else if (loading) {
    componentToRender = <Spinner />
  } else if (data) {
    let album: AlbumType  = data
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

type AlbumDetailProps = {
  album: AlbumType,
}

function AlbumDetail({ album }: AlbumDetailProps) {
  const { 
    name, 
    label, 
    total_tracks: totalTracks, 
    tracks,
    external_urls: externalUrls
  } = album

  const spotifyUrl = externalUrls.spotify || ''

  console.info(`tracks for album ${name} are`, tracks)
  
  function isPagingObj(tracks:  SimplifiedTrack[] | Paging<SimplifiedTrack>): tracks is Paging<SimplifiedTrack> {
    return (tracks as Paging<SimplifiedTrack>).items !== undefined;
  }
  
  let tracksList: SimplifiedTrack[]
  if (isPagingObj(tracks)) {
    tracksList = tracks.items
  } else {
    tracksList = tracks
  }
  

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
      tracksList.map(track => <TrackItem key={track.id} track={track} /> )
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
      items: PropTypes.arrayOf(PropTypes.object).isRequired
    }).isRequired,
    external_urls: PropTypes.shape({
      spotify: PropTypes.string
    }),
  }),

}

type InfoBadgesProps = {
  totalTracks: number,
  label: string,
}

const InfoBadges = ({ totalTracks, label}: InfoBadgesProps) => (
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

type ToSpotifyButtonProps = {
  url: string
}

const ToSpotifyButton = ({ url }: ToSpotifyButtonProps) => (
  <>
    {
      url &&
      <a href={url} className="btn btn-dark">Go to Spotify</a>
    }
  </>
)