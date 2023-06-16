import React, {useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import Loader from './components/Loader';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading,setisLoading] = useState(false);
  const fetchMoviesHandler = async() =>{
    setisLoading(true);
    const response = await fetch('https://swapi.dev/api/films/', )
    const data = await response.json();
      const transformedMovies = data.results.map(movieData => {
        return {

          id: movieData.episode_id,
          title:movieData.title,
          openingText:movieData.opening_crawl,
          releaseData:movieData.release_date
        }
      });
        setMovies(transformedMovies);
        setisLoading(false);
  }

  return (
    <React.Fragment>
      <section>
       
        <button onClick={fetchMoviesHandler} disabled={loading}>Fetch Movies</button>
      </section>
      <section>
       {!loading && <MoviesList movies={movies} /> }
        {loading && <Loader /> }
      </section>
    </React.Fragment>
  );
}

export default App;
