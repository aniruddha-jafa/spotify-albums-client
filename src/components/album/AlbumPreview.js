import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


function AlbumPreview({ album }) {
  const { name, images, release_date, id } = album
  const year = release_date.slice(0, 4)
  return (
    <div>
      <Link to={`/album/${id}`} className="card text-center to-hover">
        <img
          src={images[0].url}
          alt="album-img"
          className="album-img"
        />
        <h3 className="card-text">{name}</h3>
        <p>{year}</p>
      </Link>
    </div>
  );
}

AlbumPreview.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    release_date: PropTypes.string.isRequired
  }).isRequired

}


export default AlbumPreview