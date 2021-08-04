import { Link } from 'react-router-dom'

function Navbar({ title='Spotify album search' }) {
  return (
    <>
      <nav className="navbar bg-primary">
        <h1>{title}</h1>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar