

const getApiToken = () => 'BQAyy_bgffx29-IVBVpRHMv3K1HMBxOYP58jTwLHJ5hZ_uUPsc0B7_zvLSXsBF6--I1-tfeFfigSRg40y-g'

// get single album
export async function getAlbum(albumId) {
  try {
    const apiToken = await getApiToken()
    let album = await fetch(`https://api.spotify.com/v1/albums/${albumId}?market=ES`,
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
export async function getAlbums() {
  try {
    const artistID = "4gzpq5DPGxSnKTe4SA8HAU"
    const apiToken = await getApiToken()
    let albums = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?market=ES`,
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