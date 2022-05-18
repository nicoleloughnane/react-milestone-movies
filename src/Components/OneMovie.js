import React from 'react';
import { useNavigate } from "react-router-dom";
//import dataSource from '../dataSource';
import ReactPlayer from 'react-player';

const OneMovie = (props) => {

    //call useNavigate
    const navigate = useNavigate();

    //if the process is cancelled, go back
    const handleCancel = () => {
        navigate("/");
    }

    
    return (
        <div className='container'>
        <h2>Movie Details for {props.movie.title}</h2>
        <div className = 'row'>
            <div className = 'col col-sm-3'>
                <div className='card'>
                    <img src = {props.movie.image}
                    className = 'card-img-top'
                    alt = {props.movie.title}
                    />

                    <div className='card-body'>
                        <h5 className='card-title'>{props.movie.title}</h5>
                        <p className='card-year'>Year: {props.movie.year_released}</p>
                        <p className='card-genre'>Genre: {props.movie.genre}</p>
                        <p className='card-rating'>Rating: {props.movie.rating}</p>
                        <a href='/edit/:movieId' className='btn-btn-primary'>Edit</a>
                    </div>
                </div>
            </div>
            <div className='col col-sm-9'>
                <div className='card'>
                    <h3>Movie Trailer</h3>
                    <h5>{props.movie.title}</h5>
                    <ReactPlayer url = {props.movie.video} />
                </div>
            </div>
        </div>
       <h1>____</h1>
        <div align="center">
        <button type="button" className="btn btn-primary" onClick={handleCancel}>
          Go Back
        </button>
      
        </div>
    </div>
);
};

export default OneMovie;
