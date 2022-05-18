import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import dataSource from "../dataSource";

const EditMovie = (props) => {

    //assume this is a New Movie by setting up an empty movie
    //set flag newMovieCreation
    let movie = {
        title: '',
        year_released: '',
        genre: '',
        rating: '',
        image: '',
        video: ''
    };

    //new movie creation is true by default
    let newMovieCreation = true;

    //if a movie is provided in props then we are editing a movie
    //set movie to provided movie, set newMovieCreation to false
    if(props.movie) {
        movie = props.movie;
        newMovieCreation = false;
    }

    //properties of the movie title, year, genre, rating, and image
    //useState is called for each controlled value
    const [title, setTitle] = useState('');
    const [year_released, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');
    const [image, setImage] = useState('');
    const [video, setVideo] = useState('');

    //call useNavigate
    const navigate = useNavigate();

    //when the form is submitted, movie is logged and saved
    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("in handleFormSubmit in EditMovie");

        console.log("submit");
        const editedMovie = {
            //id is for updating/editing a movie
            id: movie.id,
            title: title,
            year_released: year_released,
            genre: genre,
            rating: rating,
            image: image,
            video: video
        };
        console.log(editedMovie);

        saveMovie(editedMovie);
    }

    //save the movie that was created
    //if a new movie is being created: do a POST (create)
    //else do a PUT (modify)
    const saveMovie = async (movie) => {
        let response;
        if(newMovieCreation) {
            response = await dataSource.post('/movies', movie);
            alert(`Your new movie has been created`);
        } else {
            response = await dataSource.put('/movies', movie);
            alert(`${props.movie.title} has been edited`);
        }
    
        console.log(response);
        console.log(response.data);
        props.onEditMovie(navigate);
    }

    //if the process is cancelled, go back
    const handleCancel = () => {
        navigate("/");
    }

    //update the properties of the movie using set ___
    const updateTitle = (event) => {
        setTitle(event.target.value);
    }
    const updateYear = (event) => {
        setYear(event.target.value);
    }
    const updateGenre = (event) => {
        setGenre(event.target.value);
    }
    const updateRating = (event) => {
        setRating(event.target.value);
    }
    const updateImage = (event) => {
        setImage(event.target.value);
    }
    const updateVideo = (event) => {
      setVideo(event.target.value);
    }


  return (

    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <h1>{newMovieCreation ? "Create New " : "Edit"} Movie</h1>
        <div className="form-group">
          <label htmlFor="albumTitle">Movie Title</label>
          <input
            type="text"
            className="form-control"
            id="movieTitle"
            placeholder={movie.title}
            value = {title}
            onChange={updateTitle}
          />
       

        <label htmlFor="movieGenre">Genre</label>
        <input
          type="text"
          className="form-control"
          id="movieGenre"
          placeholder={movie.genre}
          value = {genre}
          onChange={updateGenre}
        />

        <label htmlFor="movieYear">Year Released</label>
        <input
          type="text"
          className="form-control"
          id="movieYear"
          placeholder={movie.year_released}
          value = {year_released}
          onChange={updateYear}
        />

        <label htmlFor="movieRating">Rating</label>
        <input
          type="text"
          className="form-control"
          id="movieRating"
          placeholder={movie.rating}
          value = {rating}
          onChange={updateRating}
        />
       
       <label htmlFor="movieImage">Image</label>
        <input
          type="text"
          className="form-control"
          id="movieImage"
          placeholder={movie.image}
          value={image}
          onChange={updateImage}
        />

      <label htmlFor="movieVideo">Video</label>
        <input
          type="text"
          className="form-control"
          id="movieVideo"
          placeholder={movie.video}
          value={video}
          onChange={updateVideo}
        />

    </div>

    <div align="center">
        <button type="button" className="btn btn-light" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
