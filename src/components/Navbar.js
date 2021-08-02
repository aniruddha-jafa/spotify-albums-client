

function Navbar({ title='Spotify album search' }) {
  return (
    <>
      <nav className="navbar bg-primary">
        <h1>{title}</h1>
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>About</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar