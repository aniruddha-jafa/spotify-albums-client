import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState } from 'react'

import Navbar from './components/Navbar'
import { Home, About } from './components/pages'
import Album from './components/album/Album'

import { ALBUM_SAMPLE_JSON } from './components/album/albumsMockData'

function App() {
  const [album, setAlbum] = useState([])

  const getAlbum = async (albumId) => {
    setAlbum(ALBUM_SAMPLE_JSON)
  }
  return (
    <>      
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route path='/about' component={About}></Route>
            <Route exact path='/album/:id' render={props => (
                <Album {...props} albumDetail={album} getAlbum={getAlbum} />
              )}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}


export default App;

