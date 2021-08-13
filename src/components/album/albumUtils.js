import lodash from 'lodash'


const getApiToken = () => 'BQAp3ftitRNBPwoBcMjcytxlL8YVcg3fuw_bsk68MlexqlOnolbprgAhkj-rLr2Rp9Df-lS46wTUaQCDJRI'

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
    if (!albumId) {
      return {}
    }
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

export async function getAlbums(artistId) {
  try {
    if (!artistId) {
      return []
    }
    const apiToken = await getApiToken()
    let offset = 0, limit = 50
    const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?
    include_groups=album&offset=${offset}&limit=${limit}&market=US`,
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
    let albums = await res.json()
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