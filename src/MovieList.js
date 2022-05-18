import React from 'react';
import Card from './Components/Card';
import { useNavigate } from 'react-router-dom';

const MovieList = (props) => {

    const handleSelectionOne = (movieId, uri) => {
        console.log('Selected ID is ' + movieId);
        props.onClick(movieId, navigator, uri);
    };

    console.log('props movieList', props);
    const navigator = useNavigate();
    const movies = props.movieList.map((movie) => {
        return (
            <Card 
            key={movie.id}
            movieId={movie.id}
            movieTitle={movie.title}
            movieYear={movie.year_released} 
            movieRating={movie.rating}
            movieGenre={movie.genre}
            buttonText='View'
            image={movie.image}
            onClick={handleSelectionOne}
            />
        );
    });
    return <div className='container'>{movies}</div>;
};

export default MovieList;