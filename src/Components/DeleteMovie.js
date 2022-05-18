import React from "react";
import { useNavigate } from "react-router-dom";
import dataSource from "../dataSource";

const DeleteMovie = (props) => {
  //call useNavigate
  const navigate = useNavigate();

  console.log(props.movie.id);

  //if the process is cancelled, go back
  const handleCancel = () => {
    navigate("/");
  };

  const handleDelete = async (movie) => {
    console.log(`in handleDelete ${movie.id}`);
    const response = await dataSource.delete(`/movies/${movie.id}`);
    console.log(response);
    console.log(response.data);
    alert(`${props.movie.title} has been deleted`);
    props.onDeleteMovie(navigate);
  };

  return (
    <div className="container">
      <h3>{props.movie.title}</h3>
      <div className="row">
        <div className="col col-sm-3">
          <div className="card">
            <img
              src={props.movie.image}
              className="card-img-top"
              alt={props.movie.title}
            />

            <div className="card-body">
              <h5 className="card-title">{props.movie.title}</h5>
              <p className="card-year">Year: {props.movie.year_released}</p>
              <p className="card-genre">Genre: {props.movie.genre}</p>
              <p className="card-rating">Rating: {props.movie.rating}</p>
            </div>
          </div>
        </div>
        <div className="col col-sm-9">
          <div className="card">
          <p>Are you sure you want to delete this movie? </p>
          </div>
        </div>
      </div>
      
      <div align="center">
      <button
              type="button"
              className="btn btn-primary"
              onClick={handleCancel}
            >
              Go Back
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDelete(props.movie)}
            >
              Delete
            </button>
      </div>
    </div>
  );
};
export default DeleteMovie;
