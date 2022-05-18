import { Movie } from "../models/Movie";

import * as mysql from "mysql";
import * as util from "util";
import { Console } from "console";


export class MoviesDAO
{
    private host:string = "http://localhost";
    private port:number = 3306;
    private username:string = "";
    private password:string = "";
    private schema:string = "MOVIEDB";
    private pool = this.initDbConnection();
    
    /**
     * Non-default constructor.
     * 
     * @param host Database Hostname
     * @param username Database Username
     * @param password Database Password
     */
    constructor(host:string, port:number, username:string, password:string)
    {
        // Set all class properties
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.pool = this.initDbConnection();
    }
     /**
     * CRUD method to CREATE a Movie.
     * 
     * @param movie Movie to insert.
     * @param callback Callback function with -1 if an error else Movie ID created.  
     */
      public create(movie:Movie, callback: any)
      {
          // Get pooled database connection and run queries   
          this.pool.getConnection(async function(err:any, connection:any)
          {
              // Release connection in the pool
              connection.release();
  
              // Throw error if an error
              if (err) throw err;
  
              // Use Promisfy Util to make an async function and insert Movie
              connection.query = util.promisify(connection.query);
            
              let result1 = await connection.query('INSERT INTO MOVIES (TITLE, GENRE, YEAR_RELEASED, RATING, IMAGE, VIDEO) VALUES(?,?,?,?,?,?)', [movie.Title, movie.Genre, movie.Year_Released, movie.Rating, movie.Image, movie.Video]);
              console.log("Year released: " + movie.Year_Released);
              if(result1.affectedRows != 1)
                 callback(-1);

            let movieId = result1.insertId;
            
              // Do a callback to return the results
              callback(movieId);
          });
      }

 /**
     * CRUD method to READ/RETURN all MOVIES.
     * 
     * @param callback Callback function with an Array of type MOVIE.
     */
  public findAllMovies(callback: any)
  {
       // List of movies to return
       let movies:Movie[] = [];

      // Get pooled database connection and run queries   
      this.pool.getConnection(async function(err:any, connection:any)
      {
          // Release connection in the pool
          connection.release();

          // Throw error if an error
          if (err) throw err;

          // Use Promisfy Util to make an async function and run query to get all movies
          connection.query = util.promisify(connection.query);
          let result1 = await connection.query('SELECT * FROM MOVIES ORDER BY ID');
          for(let x=0;x < result1.length;++x)
          {     
              // Add movie to the list
              movies.push(new Movie(result1[x].ID, result1[x].TITLE, result1[x].GENRE, result1[x].YEAR_RELEASED, result1[x].RATING, result1[x].IMAGE, result1[x].VIDEO)); 
          }

          // Do a callback to return the results
          callback(movies);
       });
  
    
     }

     /**
     * CRUD method to READ/RETURN movie by ID.
     * 
     * @param callback Callback function 
     */
  public findMovieById(id: number, callback: any)
  {
       // List of movies to return
       let movie : Movie;

      // Get pooled database connection and run queries   
      this.pool.getConnection(async function(err:any, connection:any)
      {
          // Release connection in the pool
          connection.release();

          // Throw error if an error
          if (err) throw err;

          // Use Promisfy Util to make an async function and run query to get movie
          connection.query = util.promisify(connection.query);

          let result1 = await connection.query('SELECT * FROM MOVIES WHERE ID=?',  [id] );
          movie = new Movie(result1[0].ID, result1[0].TITLE, result1[0].GENRE, result1[0].YEAR_RELEASED, result1[0].RATING, result1[0].IMAGE, result1[0].VIDEO);

         console.log("Title: " + result1[0].TITLE);
         
          // Do a callback to return the results
          callback(movie);
       });
  
    
     }


     
 /**
     * CRUD method to READ/RETURN Movies by Title
     * 
     * @param callback Callback function with an Array of type MOVIE.
     */
  public findMoviesByTitle(callback: any)
  {
       // List of movies to return
       let movies:Movie[] = [];

      // Get pooled database connection and run queries   
      this.pool.getConnection(async function(err:any, connection:any)
      {
          // Release connection in the pool
          connection.release();

          // Throw error if an error
          if (err) throw err;

          // Use Promisfy Util to make an async function and run query to get all movies
          connection.query = util.promisify(connection.query);
          let result1 = await connection.query('SELECT TITLE FROM MOVIES ORDER BY ID');
          for(let x=0;x < result1.length;++x)
          {     
              // Add movie to the list
              movies.push(new Movie(result1[x].ID, result1[x].TITLE, result1[x].GENRE, result1[x].YEAR_RELEASED, result1[x].RATING, result1[x].IMAGE, result1[x].VIDEO)); 
          }

          // Do a callback to return the results
          callback(movies);
       });
    
     }

     /**
     * CRUD method to update a Movie.
     * 
     * @param movie Movie to update.
     * @param callback Callback function with number of rows updated.  
     */
    public update(movie:Movie, callback: any)
    {
         // Get pooled database connection and run queries   
         this.pool.getConnection(async function(err:any, connection:any)
         {
             // Release connection in the pool
             connection.release();
 
             // Throw error if an error
            if (err) throw err;
 
             // Use Promisfy Util to make an async function and update Movie
             let changes = 0;
             connection.query = util.promisify(connection.query);
            let result1 = await connection.query('UPDATE MOVIES SET TITLE=?, GENRE=?, YEAR_RELEASED=?, RATING=?, IMAGE=?, VIDEO=? WHERE ID=?', [movie.Title, movie.Genre, movie.Year_Released, movie.Rating, movie.Image, movie.Video, movie.Id]);
            if(result1.changedRows != 0)
                ++changes;
 
            // Do a callback to return the results
            callback(changes);
         });
     }

      /**
     * CRUD method to DELETE a Movie.
     * 
     * @param album Movie
     *  ID to delete.
     * @param callback Callback function with number of rows deleted.  
     * */
    public delete(movieId:number, callback: any)
    {
        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
           if (err) throw err;

            // Use Promisfy Util to make an async function and run query to delete the movie
            let changes = 0;
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('DELETE FROM MOVIES WHERE ID=?', [movieId]);
            changes = changes + result1.affectedRows;

            // Do a callback to return the results
            callback(changes);
        });
    }


     
    

    //* **************** Private Helper Methods **************** */

    /**
     * Private helper method to initialize a Database Connection
     */
    private initDbConnection():any
    {
        return mysql.createPool({host: this.host, port: this.port, user: this.username, password: this.password, database: this.schema, connectionLimit: 10});
    }
}
