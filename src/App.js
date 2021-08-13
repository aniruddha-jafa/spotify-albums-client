import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Navbar from './components/Navbar'
import { About } from './components/pages'
import Album from './components/album/Album'
import Albums from './components/album/Albums'

import Search from './components/Search'
import { getAlbums } from './components/album/albumUtils'

function App() {
  const [album, setAlbum] = useState({})
  const [albums, setAlbums] = useState([])
  const [artistId, setArtistId] = useState("")

  useEffect(() => {
    if (!artistId) {
      return
    }
    getAlbums(artistId)
      .then(albums => setAlbums(albums))
      .catch(err => console.error(err))
  }, [artistId])

  return (
    <>      
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path='/'>
              <Search setArtistId={setArtistId}/>
              <Albums albums={albums} />
            </Route>
            <Route path='/about' component={About}></Route>
            <Route exact path='/album/:id' render={props => (
                <Album {...props} 
                albumDetail={album} setAlbum={setAlbum}/>
              )}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}


export default App;

