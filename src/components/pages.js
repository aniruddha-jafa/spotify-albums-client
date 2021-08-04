import Search from './Search'
import Navbar from './Navbar'

export function Home() {
  return (
    <>
      <Navbar />
      <Search />
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