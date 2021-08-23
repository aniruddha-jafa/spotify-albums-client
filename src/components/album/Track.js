import PropTypes from 'prop-types'

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

export default TrackItem