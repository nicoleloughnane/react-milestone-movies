import React, { useState, useEffect } from "react";
import "./App.css";
import dataSource from "./dataSource";
import SearchMovie from "./SearchMovie";
import EditMovie from "./Components/EditMovie";
import OneMovie from "./Components/OneMovie";
import DeleteMovie from "./Components/DeleteMovie";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";

const App = () => {
  //search for movie
  const [searchPhrase, setSearchPhrase] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [currentlySelectedMovieId, setCurrentlySelectedMovieId] = useState(0);

  let refresh = false;

  const loadMovies = async () => {
    const response = await dataSource.get("/movies");

    setMovieList(response.data);
  };

  //use initialization callback function
  useEffect(() => {
    //load movies from the dataSource
    loadMovies();
  }, [refresh]);

  //search method
  const updateSearchResults = async (phrase) => {
    console.log("phrase is " + phrase);
    setSearchPhrase(phrase);
  };

  const updateSingleMovie = (id, navigate, uri) => {
    console.log("Update single movie = ", id);
    console.log("Update single movie = ", navigate);
    var indexNum = 0;
    for (var i = 0; i < movieList.length; ++i) {
      if (movieList[i].id === id) {
        indexNum = i;
      }
    }
    setCurrentlySelectedMovieId(indexNum);
    let path = uri + indexNum;
    console.log('path', path);
    navigate(path);
  };

  console.log("movieList", movieList);

  //this is for searching for the desired movie title
  const renderedList = movieList.filter((movie) => {
    if (
      movie.title.toLowerCase().includes(searchPhrase.toLowerCase()) || searchPhrase === ""
    ) {
      return true;
    }
    return false;
  });

  console.log("renderedList", renderedList);

  const onEditMovie = (navigate) => {
    loadMovies();
    navigate("/");
  }

  const onDeleteMovie = (navigate) => {
    loadMovies();
    navigate("/");
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <SearchMovie
              updateSearchResults={updateSearchResults}
              movieList={renderedList}
              updateSingleMovie={updateSingleMovie}
            />
          }
        />

        <Route exact path="/new" element={<EditMovie onEditMovie={onEditMovie} />} />
        <Route exact path='/delete/:movieId' element={<DeleteMovie onDeleteMovie={onDeleteMovie} movie={movieList[currentlySelectedMovieId]}/>} />
        <Route exact path="/edit/:movieId" element={<EditMovie onEditMovie={onEditMovie} movie={movieList[currentlySelectedMovieId]} />} />
        <Route exact path="/show/:movieId" element={<OneMovie movie={movieList[currentlySelectedMovieId]} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
