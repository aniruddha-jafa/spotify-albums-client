import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'


import { getManyAlbums  } from './albumUtils';
import AlbumPreview  from "./AlbumPreview";

 
function Albums({ artistId }) {
  const [albums, setAlbums] = useState()
  
  useEffect(() => {
    if (!artistId) return;
    getManyAlbums(artistId)
      .then(setAlbums)
      .catch(err => console.error(err))
  }, [artistId])

  if (!albums || albums.length < 1) {
    return <></>
  }
  return(
    <div className='albums-grid'>
      { albums.map((album) => <AlbumPreview key={album.id} album={album} /> ) }
    </div>
  )
} 

Albums.propTypes = {
  albums: PropTypes.arrayOf(AlbumPreview.propTypes.album)
}

export default Albums