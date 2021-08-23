import lodash from 'lodash'



async function fetchSpotifyResource(uri, getNewToken=false) {
  try {
    const apiToken = await getApiToken(getNewToken) 
    if (!apiToken) {
      throw new Error('Need valid token')
    }
    const options = {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    let data = await fetch(uri, options)
    data = await data.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

export async function getArtistId(artistName) {
  try {
    if (!artistName) {
      return ""
    }
    console.info('Getting id for artistName:', artistName)
    const findArtistIdUri = `https://api.spotify.com/v1/search?q=${artistName}&type=artist&market=US&limit=1&offset=0`
    const res = await fetchSpotifyResource(findArtistIdUri)
    const artist = await res.artists.items[0]
    const id = artist.id
    return id
  } catch(err) {
    console.error('Could not fetch artistId for artist', artistName)
    console.error(err)
  }
}

// get single album
export async function getOneAlbum(albumId) {
  try {
    if (!albumId) {
      return {}
    }
    const albumUri = `https://api.spotify.com/v1/albums/${albumId}?market=US`
    const album = await fetchSpotifyResource(albumUri)
    return album
  } catch(err) {
    console.error(err)
  }
}

export async function getManyAlbums(artistId) {
  try {
    if (!artistId) {
      return []
    }
    let offset = 0, limit = 50
    const albumsUri = `https://api.spotify.com/v1/artists/${artistId}/albums?
    include_groups=album&offset=${offset}&limit=${limit}&market=US`    

    let albums = await fetchSpotifyResource(albumsUri)
    albums = await albums.items
    albums = filterAlbums(albums)
    return albums
  } catch(err) {
    console.error(`Could not fetch albums for id ${artistId}`)
    console.error(err)
  }
}

function filterAlbums(albums) {
  let output = lodash.uniqBy(albums, 'name')
  
  // exclude albums which contain `(.. remix)` in title
  // e.g. Higher Power (Tiesto Remix)
  output = output.filter(album => {
    if (album.name.match(/remix(es){0,1}/i)) {  
      return false
    }
    return true
  })
  
  return output
}