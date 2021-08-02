function Search() {
  return (
    <>
      <form action="">
        <input
          type="text"
          name="artist"
          placeholder="Search an artist..."
          className="btn wide-block btn-light"
        />
        <button type="submit" className="btn wide-block btn-dark">
          Search
        </button>
      </form>
    </>
  )
}

export default Search