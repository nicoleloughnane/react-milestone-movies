import React from 'react';

const Card = (props) => {

  const handleButtonClick = (event, uri) => {
    console.log('ID clicked is ' + props.movieId);
    props.onClick(props.movieId, uri);
  };

  return (
    <div className="card" style={{width: '18rem'}}>
    <img src={props.image} alt="placeholder img"/>
    <div className="card-body">
   <h5 className="card-title">{props.movieTitle}</h5>
    <p className="card-text"> {props.movieYear}</p>
  
   <button onClick={() => handleButtonClick(props.movieId, '/show/')} className = 'btn btn-primary'> {props.buttonText}</button>
   <button onClick={() => handleButtonClick(props.movieId, '/edit/')} className = 'btn btn-secondary'> Edit </button>
   <button onClick={() => handleButtonClick(props.movieId, '/delete/')} className = 'btn btn-danger'> Delete </button>
</div>
</div>
  );
};

export default Card;
