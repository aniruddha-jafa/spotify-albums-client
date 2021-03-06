import PropTypes from 'prop-types'
import { SimplifiedTrack } from 'spotify-types'

type Props = {
  track: SimplifiedTrack | null
}

const TrackItem = ({ track }: Props) => {
  if (track == null) {
    return <></>
  }
  return(
    <div className='wide-block'>
    <p> {track.name} </p>
    {
      track && 
      track.is_playable &&
      <audio controls>
        <source src={track.preview_url}/>
      </audio>
    }
  </div>
  );
}

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

export default TrackItem