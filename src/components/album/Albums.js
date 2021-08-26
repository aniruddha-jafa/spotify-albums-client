import PropTypes from 'prop-types'

import AlbumPreview  from "./AlbumPreview"
import Spinner from './../loading/Spinner'

import { getManyAlbums  } from './../../utils/albumUtils'
import { useFetcher } from './../../utils/hooks'
 
function Albums({ artistId }) {
  const { loading, data: albums, error } = useFetcher(getManyAlbums, artistId)
  
  const Error = () => (<pre>{JSON.stringify(error, null, 2)}</pre>)
  
  let ComponentToRender = <></>

  if (!artistId) {
    // pass
  } else if (loading) {
    ComponentToRender = <Spinner />
  } else if (error) {
    ComponentToRender = <Error />
  } else if (albums && albums.length > 0) {
    ComponentToRender = (
    <div className='albums-grid'>
      { albums.map(album => <AlbumPreview key={album.id} album={album} /> ) }
    </div> )
  }

  return(
    <>
      {ComponentToRender}
    </>
  );
} 

Albums.propTypes = {
  artistId: PropTypes.string.isRequired
}

export default Albums