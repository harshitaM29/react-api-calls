import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  const removeMovieHandler = id => {
    props.onRemoveMovie(id);

  }

  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          onRemove={removeMovieHandler.bind(null,movie.id)}

          />
      ))}
    </ul>
  );
};

export default MovieList;
