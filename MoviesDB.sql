DROP DATABASE If exists MOVIEDB;
CREATE DATABASE If not exists MOVIEDB;
USE MOVIEDB;
DROP TABLE if exists MOVIES;
CREATE TABLE MOVIES(
   ID INT PRIMARY KEY AUTO_INCREMENT,
   TITLE VARCHAR (50) NOT NULL,
   GENRE VARCHAR (20) NOT NULL,
   YEAR_RELEASED INT (4),
   RATING INT NOT NULL,
   IMAGE varchar(200) NOT NULL,
   VIDEO varchar(250) NOT NULL
);

INSERT INTO MOVIES (TITLE, GENRE, YEAR_RELEASED, RATING, IMAGE, VIDEO) VALUES ("Speed", "Thriller", 1994, 94, 'https://upload.wikimedia.org/wikipedia/en/4/45/Speed_movie_poster.jpg', 'https://youtu.be/8piqd2BWeGI'), ("The Matrix", "Sci-fi", 1999, 88, 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg', 'https://youtu.be/vKQi3bBA1y8'), ("Jurassic Park", "Sci-fi", 1993, 92, 'https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg', 'https://youtu.be/QWBKEmWWL38'), ("Baby Driver", "Thriller", 2017, 92, 'https://upload.wikimedia.org/wikipedia/en/8/8e/Baby_Driver_poster.jpg', 'https://youtu.be/D9YZw_X5UzQ'), ("Avengers: Endgame", "Fantasy", 2019 , 94, 'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg', 'https://youtu.be/TcMBFSGVi1c'), ("Avengers: Infinity War", "Fantasy", 2018, 85, 'https://upload.wikimedia.org/wikipedia/en/4/4d/Avengers_Infinity_War_poster.jpg', 'https://youtu.be/6ZfuNTqbHE8'), ("War Games", "Drama", 1983, 93, 'https://upload.wikimedia.org/wikipedia/en/2/29/Wargames.jpg', 'https://youtu.be/hbqMuvnx5MU') ;

SELECT * FROM MOVIES WHERE ID = 4;