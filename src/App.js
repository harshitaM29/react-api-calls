import React, {useCallback, useEffect, useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import Loader from './components/Loader';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading,setisLoading] = useState(false);
  const [error,setError] = useState();

  const fetchMoviesHandler = useCallback(async () => {
    setisLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/', )
      if(!response.ok){
        setTimeout(() => {
          const response = fetch('https://swapi.dev/api/films/', )
          setisLoading(true);
        },500)
       
        throw new Error('Something Went Wrong')
       
       
      } else {
        setisLoading(false);
      }

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
    } catch(error) {
      setError(error.message )
    }
    
        setisLoading(false);
  },[]);
    useEffect(() => {
    fetchMoviesHandler();
  },[fetchMoviesHandler])
  
let content = <b>...Retrying</b>
const handleCancel = () => {
  setisLoading(false)
}

  return (
    <React.Fragment>
      <section>
       
        <button onClick={fetchMoviesHandler} disabled={loading}>Fetch Movies</button>
      </section>
      <section>
       {loading && <button onClick={handleCancel}>X</button>}
       {!loading && <MoviesList movies={movies} /> }
        {loading && <Loader /> }
        {!loading && error && <p>{error}{content}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
