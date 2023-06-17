import React, {useCallback, useEffect, useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import Loader from './components/Loader';
import MovieForm from './components/MovieForm';
function App() {
  const [movies, setMovies] = useState([]);
  const [loading,setisLoading] = useState(false);
  const [error,setError] = useState();

  const fetchMoviesHandler = useCallback(async () => {
    setisLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-3ac12-default-rtdb.firebaseio.com/movies.json', )
      if(!response.ok){
        setTimeout(() => {
          const response = fetch('https://react-http-3ac12-default-rtdb.firebaseio.com/movies.json', )
          setisLoading(true);
        },500)
       
        throw new Error('Something Went Wrong')
       
       
      } else {
        setisLoading(false);
      }

    const data = await response.json();
      console.log(data);
    const loadedMovies =[];

    for(const key in data) {
      loadedMovies.push({
        id: key,
        title: data[key].title,
        openingText: data[key].openingText,
        releaseDate: data[key].releaseDate
      })
    }

   
        setMovies(loadedMovies);
    } catch(error) {
      setError(error.message )
    }
    
        setisLoading(false);
  },[]);
    useEffect(() => {
    fetchMoviesHandler();
  },[fetchMoviesHandler])

  const addMovieHandler = async(movie) => {
    const response = await fetch('https://react-http-3ac12-default-rtdb.firebaseio.com/movies.json', {
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
      'Content-Type':'application/json'
    }
   });
   
  }

  const removeMovie = async(id) => {
  
    console.log((id))
    const response = await fetch(`https://react-http-3ac12-default-rtdb.firebaseio.com/movies/${id}.json`, {
      method: 'DELETE',
    });
    setMovies(values => {
      return values.filter(item => item.id !== id)
    })
  }
  
  
let content = <b>...Retrying</b>
const handleCancel = () => {
  setisLoading(false)
}

  return (
    <React.Fragment>
      <section>
      <MovieForm onAddMovie={addMovieHandler} />
      </section>
      <section>
      
        <button onClick={fetchMoviesHandler} disabled={loading}>Fetch Movies</button>
      </section>
      <section>
       {loading && <button onClick={handleCancel}>X</button>}
       {!loading && <MoviesList movies={movies}  onRemoveMovie={removeMovie} /> }
        {loading && <Loader /> }
        {!loading && error && <p>{error}{content}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
