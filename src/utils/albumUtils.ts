import { uniqBy } from 'lodash'
import { config } from './config-dev-secret.js'

// types
import { Artist, SearchContent, Paging, Album } from 'spotify-types'

// ----------------------------------------------------

let apiToken =  ''
const EXPIRATION_MS = 3*1e6  // 50 mins

function refreshToken() {  
  setTimeout(() => {
    getApiToken(true)
     .then(() => refreshToken())
     .catch(err => console.error(err))
  }, EXPIRATION_MS)
}

refreshToken()  // recursively calls itself every 50 mins

async function getApiToken (getNewToken = false) {
  try {
    if (!getNewToken && apiToken) {
      console.info(`Returning existing token: ${apiToken.slice(0, 5)}`)
      return apiToken
    }

    const secret = process.env.REACT_APP_CLIENT_SECRET || config.getClientSecret() || ''
    if (!secret) {
      throw new Error('Need a secret')
    }

    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "grant_type=client_credentials"
    })

    type JSONData = {
      access_token: string
    }

    const data: JSONData = await res.json() 
    console.info('Api token request received response:', res)
    
    apiToken = data.access_token || ''
    console.info('setting api token:', apiToken)

    return apiToken
  
  } catch (err) {
    console.error('Error in getting api token:', err)
    return Promise.reject(err)
  }
}

async function fetchSpotifyResource (uri: string) {
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
    const res = await fetch(uri, options)
    console.log('api response is: ', res)
    return res
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

export async function getArtistId(artistName: string) {
  let artistId = ''
  try {
    console.info('Getting id for artistName:', artistName)
    const findArtistIdUri = `https://api.spotify.com/v1/search?q=${artistName}&type=artist&market=US&limit=1&offset=0`
    
    const res = await fetchSpotifyResource(findArtistIdUri)
    const data: SearchContent = await res.json()
    
    if (data.artists != null) {
      const artistsPage: Paging<Artist> = data.artists
      const artist: Artist = artistsPage.items[0]
      artistId =  artist.id
    }
    return artistId
  } catch(err) {
    // console.error('Could not fetch artistId for artist', artistName)
    console.error(err)
    return Promise.reject(err)
  } finally {
    return artistId
  }
}

// get single album
export async function getOneAlbum(albumId: string) {
  try {
    const albumUri = `https://api.spotify.com/v1/albums/${albumId}?market=US`
    const res = await fetchSpotifyResource(albumUri)
    const album: Album = await res.json()
    return album
  } catch(err) {
    console.error('Could not get album', err)
    return Promise.reject(err)
  }
}

export async function getManyAlbums(artistId: string) {
  try {
    // if (!artistId) return;
    console.info(`Getting many albums for: ${artistId}`)

    let offset = 0, limit = 50
    const albumsUri = `https://api.spotify.com/v1/artists/${artistId}/albums?
    include_groups=album&offset=${offset}&limit=${limit}&market=US`    

    const res = await fetchSpotifyResource(albumsUri)
    const albumPager: Paging<Album> = await res.json()
    
    let albums = albumPager.items
    albums = filterAlbums(albums)
    
    return albums
  } catch(err) {
    console.error(`Could not fetch albums for id ${artistId}`)
    console.error(err)
    return Promise.reject(err)
  }
}

function filterAlbums(albums: Album[]) {
  let output = uniqBy(albums, 'name')
  
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