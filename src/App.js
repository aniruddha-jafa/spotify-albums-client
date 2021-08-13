import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState } from 'react'

import Navbar from './components/Navbar'
import { About } from './components/pages'
import Album from './components/album/Album'
import Albums from './components/album/Albums'

import { getAlbum } from './components/album/albumUtils'
import Search from './components/Search'
import { ALBUMS_SAMPLE_JSON } from './components/album/albumsMockData'

function App() {
  const [album, setAlbum] = useState([])
  return (
    <>      
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path='/'>
              <Search />
              <Albums albums={ALBUMS_SAMPLE_JSON}/>
            </Route>
            <Route path='/about' component={About}></Route>
            <Route exact path='/album/:id' render={props => (
                <Album {...props} 
                albumDetail={album} getAlbum={getAlbum} setAlbum={setAlbum}/>
              )}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}


export default App;

