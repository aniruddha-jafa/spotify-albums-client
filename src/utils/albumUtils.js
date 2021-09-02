import lodash from 'lodash'
import { config } from './config-dev-secret.js'

let apiToken =  ''
const EXPIRATION_MS = 3*1e6  // 50 mins

function refreshToken() {  
  setTimeout(() => {
    getApiToken(true)
     .then(() => refreshToken)
     .catch(err => console.error(err))
  }, EXPIRATION_MS)
}

refreshToken()  // recursively calls itself every 50 mins

async function getApiToken (getNewToken=false) {
  try {
    if (!getNewToken && apiToken) {
      console.info(`Returning existing token: ${apiToken.slice(0, 5)}`)
      return apiToken
    }

    const secret = process.env.REACT_APP_CLIENT_SECRET || config.getClientSecret() || ''
    if (!secret) {
      throw new Error('Need a secret')
    }

    let res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "grant_type=client_credentials"
    })

    res = await res.json() 
    console.info('Api token request received response:', res)
    
    apiToken = await res.access_token || ''
    console.info('setting api token:', apiToken)

    return apiToken
  
  } catch (err) {
    console.error('Error in getting api token:', err)
  }
}


async function fetchSpotifyResource(uri) {
  try {
    const apiToken = await getApiToken() 
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
    if (!artistName) return;

    console.info('Getting id for artistName:', artistName)
    const findArtistIdUri = `https://api.spotify.com/v1/search?q=${artistName}&type=artist&market=US&limit=1&offset=0`
    const res = await fetchSpotifyResource(findArtistIdUri)
    const artist = await res.artists.items[0]
    const id = artist.id
    return id
  } catch(err) {
    console.error('Could not fetch artistId for artist', artistName)
    console.error(err)
    throw new Error(err)
  }
}

// get single album
export async function getOneAlbum(albumId) {
  try {
    if (!albumId) return;
    const albumUri = `https://api.spotify.com/v1/albums/${albumId}?market=US`
    const album = await fetchSpotifyResource(albumUri)
    return album
  } catch(err) {
    console.error('Could not get album', err)
    throw new Error(err)
  }
}

export async function getManyAlbums(artistId) {
  try {
    if (!artistId) return;

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
    throw new Error(err)
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