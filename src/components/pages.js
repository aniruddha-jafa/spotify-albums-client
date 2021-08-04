import Search from './Search'
import Albums from './album/Albums'

import { ALBUMS_SAMPLE_JSON } from './album/albumsMockData'

export function Home() {
  return (
    <>
      <Search />
      <Albums albums={ALBUMS_SAMPLE_JSON} />
    </>
  )
}

export function About() {
  const message = "This app uses Spotify's api to search for and display an artist's albums"
  return(
    <>
      <h1>About</h1>
      <p>{message}</p>
    </>
  )
}