import PropTypes from 'prop-types'

// components
import AlbumPreview from './AlbumPreview'
import Spinner from '../loading/Spinner'

// types
import { Album } from 'spotify-types'

// ----------------------------------------------------

type Props = {
  artistId: string,
  albums: Album[] | null,
  loading: boolean,
  error: Error | null,
}

export default function Albums({ artistId, albums, loading, error }: Props) {
  let content = <></>
  if (!artistId) {
    // pass
  } else if (loading) {
    content = <Spinner />
  } else if (error) {
    const Error = () => <pre>{JSON.stringify(error, null, 2)}</pre>
    content = <Error />
  } else if (albums && albums.length > 0) {
    content = (
      <div className="albums-grid">
        {albums.map((album) => (
          <AlbumPreview key={album.id} album={album} />
        ))}
      </div>
    )
  }
  return <>{content}</>
}

Albums.propTypes = {
  artistId: PropTypes.string,
}
