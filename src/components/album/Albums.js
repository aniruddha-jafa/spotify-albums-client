import PropTypes from 'prop-types'
import AlbumPreview  from "./AlbumPreview";

function Albums({ albums }) {
  return(
    <div className='albums-grid '>
      { albums.map((album) => <AlbumPreview key={album.id} album={album} />) }
    </div>
  )
} 

Albums.propTypes = {
  albums: PropTypes.arrayOf(AlbumPreview.propTypes.album)
}

export default Albums