import PropTypes from 'prop-types'

import AlbumPreview  from "./AlbumPreview"
import Spinner from './../loading/Spinner'
 
function Albums({ artistId, albums, loading, error }) {
  let _Albums = <></>
  if (!artistId) {
    // pass
  } else if (loading) {
    _Albums = <Spinner />
  } else if (error) {
    const Error = () => (<pre>{JSON.stringify(error, null, 2)}</pre>)
    _Albums = <Error />
  } else if (albums && albums.length > 0) {
    _Albums = (
    <div className='albums-grid'>
      { albums.map(album => <AlbumPreview key={album.id} album={album} /> ) }
    </div> 
    )}
  return(
    <>
      {_Albums}
    </>
  );
} 

Albums.propTypes = {
  artistId: PropTypes.string
}

export default Albums