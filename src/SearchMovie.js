import React from 'react';
import SearchForm from './SearchForm';
import MovieList from './MovieList';

const SearchMovie = (props) => {
    console.log('props with update single movie ', props);
    return(
        <div className='container'>
            <SearchForm onSubmit = {props.updateSearchResults} />

            <MovieList movieList={props.movieList} onClick = {props.updateSingleMovie}/>
        </div>
    );
};

export default SearchMovie;