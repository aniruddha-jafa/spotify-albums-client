
export function About() {
  const message = "This app uses Spotify's api to search for and display an artist's albums"
  return(
    <>
      <h1>About</h1>
      <p>{message}</p>
    </>
  )
}

export const NotFound = () => (
  <>
    <h1>Not found! (Error 404)</h1>
    <p>Sorry, we couldn't find that page </p>
  </>
)

