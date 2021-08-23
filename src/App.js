import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState } from 'react'

import Navbar from './components/Navbar'
import { About } from './components/pages'
import Album from './components/album/Album'
import Albums from './components/album/Albums'

import Search from './components/Search'


function App() {
  const [artistId, setArtistId] = useState('')

  return (
    <>      
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path='/'>
              <Search setArtistId={setArtistId}/>
              <Albums artistId={artistId} />
            </Route>
            <Route path='/about' component={About}></Route>
            <Route exact path='/album/:id' render={props => <Album {...props} />}/>
          </Switch>
        </div>
      </Router>
    </>
  );
}


export default App;

