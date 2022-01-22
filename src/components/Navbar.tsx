import { Link } from 'react-router-dom'

export default function Navbar({ title='Spotify album search' }) {
  const NavbarTitle = () => (
    <div className="nav-title">
      <div>
        <i className="fab fa-spotify fa-2x"/>
      </div>
      <div>
        <h1>{title}</h1>
      </div>
    </div>
  ) 

  return (
    <>
      <nav className="navbar bg-primary">
        <NavbarTitle />
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