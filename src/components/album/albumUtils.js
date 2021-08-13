

const getApiToken = () => 'BQCvqIzFp_fqWnnTAqZU8vRBDZyh4HdZpeaKFt2Q5Zd-72vaL4qQQgGXVpHYTec1EMBFjgvn4i5-MFQqqUw'

export async function getArtistId(artistName) {
  try {
    if (!artistName) {
      return ""
    }
    console.info('Getting id for artistName:', artistName)
    const apiToken = await getApiToken()
    let res = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist&market=US&limit=1&offset=0`,
    {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    if (!res.ok) {
      throw new Error(res)
    }
    res = await res.json()
    const artist = await res.artists.items[0]
    const id = artist.id
    return id
  } catch(err) {
    console.error('Could not fetch artistId for artist', artistName)
    console.error(err)
  }
}

// get single album
export async function getAlbum(albumId) {
  try {
    const apiToken = await getApiToken()
    let album = await fetch(`https://api.spotify.com/v1/albums/${albumId}?market=US`,
      {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
    album = await album.json()
    return album
  } catch(err) {
    console.error(err)
  }
}

// get multiple albums, given an artist
export async function getAlbums(artist) {
  try {
    //const artistID = await getArtistId("Coldplay")
    const artistID = '4gzpq5DPGxSnKTe4SA8HAU'
    const apiToken = await getApiToken()
    let albums = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?market=US`,
    {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    albums = await albums.json()
    return albums
  } catch(err) {
    console.error(err)
  }
}