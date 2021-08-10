import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState } from 'react'

import Navbar from './components/Navbar'
import { Home, About } from './components/pages'
import Album from './components/album/Album'

import { getAlbum } from './utils'

function App() {
  const [album, setAlbum] = useState([])
  return (
    <>      
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path='/' component={Home}></Route>
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

