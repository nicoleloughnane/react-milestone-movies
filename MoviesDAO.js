"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoviesDAO = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Movie = require("../models/Movie");

var mysql = _interopRequireWildcard(require("mysql"));

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var MoviesDAO = /*#__PURE__*/function () {
  /**
   * Non-default constructor.
   * 
   * @param host Database Hostname
   * @param username Database Username
   * @param password Database Password
   */
  function MoviesDAO(host, port, username, password) {
    (0, _classCallCheck2["default"])(this, MoviesDAO);
    (0, _defineProperty2["default"])(this, "host", "http://localhost");
    (0, _defineProperty2["default"])(this, "port", 3306);
    (0, _defineProperty2["default"])(this, "username", "");
    (0, _defineProperty2["default"])(this, "password", "");
    (0, _defineProperty2["default"])(this, "schema", "MOVIEDB");
    (0, _defineProperty2["default"])(this, "pool", this.initDbConnection());
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


  (0, _createClass2["default"])(MoviesDAO, [{
    key: "create",
    value: function create(movie, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, connection) {
          var result1, movieId;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and insert Movie
                  connection.query = util.promisify(connection.query);
                  _context.next = 6;
                  return connection.query('INSERT INTO MOVIES (TITLE, GENRE, YEAR_RELEASED, RATING, IMAGE, VIDEO) VALUES(?,?,?,?,?,?)', [movie.Title, movie.Genre, movie.Year_Released, movie.Rating, movie.Image, movie.Video]);

                case 6:
                  result1 = _context.sent;
                  console.log("Year released: " + movie.Year_Released);
                  if (result1.affectedRows != 1) callback(-1);
                  movieId = result1.insertId; // Do a callback to return the results

                  callback(movieId);

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
    /**
        * CRUD method to READ/RETURN all MOVIES.
        * 
        * @param callback Callback function with an Array of type MOVIE.
        */

  }, {
    key: "findAllMovies",
    value: function findAllMovies(callback) {
      // List of movies to return
      var movies = []; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err, connection) {
          var result1, x;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context2.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to get all movies
                  connection.query = util.promisify(connection.query);
                  _context2.next = 6;
                  return connection.query('SELECT * FROM MOVIES ORDER BY ID');

                case 6:
                  result1 = _context2.sent;

                  for (x = 0; x < result1.length; ++x) {
                    // Add movie to the list
                    movies.push(new _Movie.Movie(result1[x].ID, result1[x].TITLE, result1[x].GENRE, result1[x].YEAR_RELEASED, result1[x].RATING, result1[x].IMAGE, result1[x].VIDEO));
                  } // Do a callback to return the results


                  callback(movies);

                case 9:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
    /**
    * CRUD method to READ/RETURN movie by ID.
    * 
    * @param callback Callback function 
    */

  }, {
    key: "findMovieById",
    value: function findMovieById(id, callback) {
      // List of movies to return
      var movie; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(err, connection) {
          var result1;
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context3.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to get movie
                  connection.query = util.promisify(connection.query);
                  _context3.next = 6;
                  return connection.query('SELECT * FROM MOVIES WHERE ID=?', [id]);

                case 6:
                  result1 = _context3.sent;
                  movie = new _Movie.Movie(result1[0].ID, result1[0].TITLE, result1[0].GENRE, result1[0].YEAR_RELEASED, result1[0].RATING, result1[0].IMAGE, result1[0].VIDEO);
                  console.log("Title: " + result1[0].TITLE); // Do a callback to return the results

                  callback(movie);

                case 10:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
    /**
        * CRUD method to READ/RETURN Movies by Title
        * 
        * @param callback Callback function with an Array of type MOVIE.
        */

  }, {
    key: "findMoviesByTitle",
    value: function findMoviesByTitle(callback) {
      // List of movies to return
      var movies = []; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(err, connection) {
          var result1, x;
          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context4.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to get all movies
                  connection.query = util.promisify(connection.query);
                  _context4.next = 6;
                  return connection.query('SELECT TITLE FROM MOVIES ORDER BY ID');

                case 6:
                  result1 = _context4.sent;

                  for (x = 0; x < result1.length; ++x) {
                    // Add movie to the list
                    movies.push(new _Movie.Movie(result1[x].ID, result1[x].TITLE, result1[x].GENRE, result1[x].YEAR_RELEASED, result1[x].RATING, result1[x].IMAGE, result1[x].VIDEO));
                  } // Do a callback to return the results


                  callback(movies);

                case 9:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
    /**
    * CRUD method to update a Movie.
    * 
    * @param movie Movie to update.
    * @param callback Callback function with number of rows updated.  
    */

  }, {
    key: "update",
    value: function update(movie, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(err, connection) {
          var changes, result1;
          return _regenerator["default"].wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context5.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and update Movie
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context5.next = 7;
                  return connection.query('UPDATE MOVIES SET TITLE=?, GENRE=?, YEAR_RELEASED=?, RATING=?, IMAGE=?, VIDEO=? WHERE ID=?', [movie.Title, movie.Genre, movie.Year_Released, movie.Rating, movie.Image, movie.Video, movie.Id]);

                case 7:
                  result1 = _context5.sent;
                  if (result1.changedRows != 0) ++changes; // Do a callback to return the results

                  callback(changes);

                case 10:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x9, _x10) {
          return _ref5.apply(this, arguments);
        };
      }());
    }
    /**
    * CRUD method to DELETE a Movie.
    * 
    * @param album Movie
    *  ID to delete.
    * @param callback Callback function with number of rows deleted.  
    * */

  }, {
    key: "delete",
    value: function _delete(movieId, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(err, connection) {
          var changes, result1;
          return _regenerator["default"].wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context6.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to delete the movie
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context6.next = 7;
                  return connection.query('DELETE FROM MOVIES WHERE ID=?', [movieId]);

                case 7:
                  result1 = _context6.sent;
                  changes = changes + result1.affectedRows; // Do a callback to return the results

                  callback(changes);

                case 10:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        return function (_x11, _x12) {
          return _ref6.apply(this, arguments);
        };
      }());
    } //* **************** Private Helper Methods **************** */

    /**
     * Private helper method to initialize a Database Connection
     */

  }, {
    key: "initDbConnection",
    value: function initDbConnection() {
      return mysql.createPool({
        host: this.host,
        port: this.port,
        user: this.username,
        password: this.password,
        database: this.schema,
        connectionLimit: 10
      });
    }
  }]);
  return MoviesDAO;
}();

exports.MoviesDAO = MoviesDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9Nb3ZpZXNEQU8udHMiXSwibmFtZXMiOlsiTW92aWVzREFPIiwiaG9zdCIsInBvcnQiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiaW5pdERiQ29ubmVjdGlvbiIsInBvb2wiLCJtb3ZpZSIsImNhbGxiYWNrIiwiZ2V0Q29ubmVjdGlvbiIsImVyciIsImNvbm5lY3Rpb24iLCJyZWxlYXNlIiwicXVlcnkiLCJ1dGlsIiwicHJvbWlzaWZ5IiwiVGl0bGUiLCJHZW5yZSIsIlllYXJfUmVsZWFzZWQiLCJSYXRpbmciLCJJbWFnZSIsIlZpZGVvIiwicmVzdWx0MSIsImNvbnNvbGUiLCJsb2ciLCJhZmZlY3RlZFJvd3MiLCJtb3ZpZUlkIiwiaW5zZXJ0SWQiLCJtb3ZpZXMiLCJ4IiwibGVuZ3RoIiwicHVzaCIsIk1vdmllIiwiSUQiLCJUSVRMRSIsIkdFTlJFIiwiWUVBUl9SRUxFQVNFRCIsIlJBVElORyIsIklNQUdFIiwiVklERU8iLCJpZCIsImNoYW5nZXMiLCJJZCIsImNoYW5nZWRSb3dzIiwibXlzcWwiLCJjcmVhdGVQb29sIiwidXNlciIsImRhdGFiYXNlIiwic2NoZW1hIiwiY29ubmVjdGlvbkxpbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7Ozs7O0lBSWFBLFM7QUFTVDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJLHFCQUFZQyxJQUFaLEVBQXlCQyxJQUF6QixFQUFzQ0MsUUFBdEMsRUFBdURDLFFBQXZELEVBQ0E7QUFBQTtBQUFBLG1EQWZzQixrQkFldEI7QUFBQSxtREFkc0IsSUFjdEI7QUFBQSx1REFiMEIsRUFhMUI7QUFBQSx1REFaMEIsRUFZMUI7QUFBQSxxREFYd0IsU0FXeEI7QUFBQSxtREFWZSxLQUFLQyxnQkFBTCxFQVVmO0FBQ0k7QUFDQSxTQUFLSixJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFD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T0FBRCxDQUFSOztBQWZvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWlCSCxLLENBTUQ7O0FBRUE7QUFDSjtBQUNBOzs7O1dBQ0ksNEJBQ0E7QUFDSSxhQUFPRyxLQUFLLENBQUNDLFVBQU4sQ0FBaUI7QUFBQzVDLFFBQUFBLElBQUksRUFBRSxLQUFLQSxJQUFaO0FBQWtCQyxRQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFBN0I7QUFBbUM0QyxRQUFBQSxJQUFJLEVBQUUsS0FBSzNDLFFBQTlDO0FBQXdEQyxRQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFBdkU7QUFBaUYyQyxRQUFBQSxRQUFRLEVBQUUsS0FBS0MsTUFBaEc7QUFBd0dDLFFBQUFBLGVBQWUsRUFBRTtBQUF6SCxPQUFqQixDQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb3ZpZSB9IGZyb20gXCIuLi9tb2RlbHMvTW92aWVcIjtcclxuXHJcbmltcG9ydCAqIGFzIG15c3FsIGZyb20gXCJteXNxbFwiO1xyXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XHJcbmltcG9ydCB7IENvbnNvbGUgfSBmcm9tIFwiY29uc29sZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBNb3ZpZXNEQU9cclxue1xyXG4gICAgcHJpdmF0ZSBob3N0OnN0cmluZyA9IFwiaHR0cDovL2xvY2FsaG9zdFwiO1xyXG4gICAgcHJpdmF0ZSBwb3J0Om51bWJlciA9IDMzMDY7XHJcbiAgICBwcml2YXRlIHVzZXJuYW1lOnN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIHBhc3N3b3JkOnN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIHNjaGVtYTpzdHJpbmcgPSBcIk1PVklFREJcIjtcclxuICAgIHByaXZhdGUgcG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIE5vbi1kZWZhdWx0IGNvbnN0cnVjdG9yLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gaG9zdCBEYXRhYmFzZSBIb3N0bmFtZVxyXG4gICAgICogQHBhcmFtIHVzZXJuYW1lIERhdGFiYXNlIFVzZXJuYW1lXHJcbiAgICAgKiBAcGFyYW0gcGFzc3dvcmQgRGF0YWJhc2UgUGFzc3dvcmRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaG9zdDpzdHJpbmcsIHBvcnQ6bnVtYmVyLCB1c2VybmFtZTpzdHJpbmcsIHBhc3N3b3JkOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICAvLyBTZXQgYWxsIGNsYXNzIHByb3BlcnRpZXNcclxuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xyXG4gICAgICAgIHRoaXMucG9ydCA9IHBvcnQ7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcclxuICAgICAgICB0aGlzLnBvb2wgPSB0aGlzLmluaXREYkNvbm5lY3Rpb24oKTtcclxuICAgIH1cclxuICAgICAvKipcclxuICAgICAqIENSVUQgbWV0aG9kIHRvIENSRUFURSBhIE1vdmllLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gbW92aWUgTW92aWUgdG8gaW5zZXJ0LlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggLTEgaWYgYW4gZXJyb3IgZWxzZSBNb3ZpZSBJRCBjcmVhdGVkLiAgXHJcbiAgICAgKi9cclxuICAgICAgcHVibGljIGNyZWF0ZShtb3ZpZTpNb3ZpZSwgY2FsbGJhY2s6IGFueSlcclxuICAgICAge1xyXG4gICAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxyXG4gICAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXHJcbiAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgXHJcbiAgICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcclxuICAgICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcbiAgXHJcbiAgICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgaW5zZXJ0IE1vdmllXHJcbiAgICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0lOU0VSVCBJTlRPIE1PVklFUyAoVElUTEUsIEdFTlJFLCBZRUFSX1JFTEVBU0VELCBSQVRJTkcsIElNQUdFLCBWSURFTykgVkFMVUVTKD8sPyw/LD8sPyw/KScsIFttb3ZpZS5UaXRsZSwgbW92aWUuR2VucmUsIG1vdmllLlllYXJfUmVsZWFzZWQsIG1vdmllLlJhdGluZywgbW92aWUuSW1hZ2UsIG1vdmllLlZpZGVvXSk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJZZWFyIHJlbGVhc2VkOiBcIiArIG1vdmllLlllYXJfUmVsZWFzZWQpO1xyXG4gICAgICAgICAgICAgIGlmKHJlc3VsdDEuYWZmZWN0ZWRSb3dzICE9IDEpXHJcbiAgICAgICAgICAgICAgICAgY2FsbGJhY2soLTEpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1vdmllSWQgPSByZXN1bHQxLmluc2VydElkO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xyXG4gICAgICAgICAgICAgIGNhbGxiYWNrKG1vdmllSWQpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAvKipcclxuICAgICAqIENSVUQgbWV0aG9kIHRvIFJFQUQvUkVUVVJOIGFsbCBNT1ZJRVMuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGFuIEFycmF5IG9mIHR5cGUgTU9WSUUuXHJcbiAgICAgKi9cclxuICBwdWJsaWMgZmluZEFsbE1vdmllcyhjYWxsYmFjazogYW55KVxyXG4gIHtcclxuICAgICAgIC8vIExpc3Qgb2YgbW92aWVzIHRvIHJldHVyblxyXG4gICAgICAgbGV0IG1vdmllczpNb3ZpZVtdID0gW107XHJcblxyXG4gICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXHJcbiAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICB7XHJcbiAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcclxuICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cclxuICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXHJcbiAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgbW92aWVzXHJcbiAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gTU9WSUVTIE9SREVSIEJZIElEJyk7XHJcbiAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxyXG4gICAgICAgICAgeyAgICAgXHJcbiAgICAgICAgICAgICAgLy8gQWRkIG1vdmllIHRvIHRoZSBsaXN0XHJcbiAgICAgICAgICAgICAgbW92aWVzLnB1c2gobmV3IE1vdmllKHJlc3VsdDFbeF0uSUQsIHJlc3VsdDFbeF0uVElUTEUsIHJlc3VsdDFbeF0uR0VOUkUsIHJlc3VsdDFbeF0uWUVBUl9SRUxFQVNFRCwgcmVzdWx0MVt4XS5SQVRJTkcsIHJlc3VsdDFbeF0uSU1BR0UsIHJlc3VsdDFbeF0uVklERU8pKTsgXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcclxuICAgICAgICAgIGNhbGxiYWNrKG1vdmllcyk7XHJcbiAgICAgICB9KTtcclxuICBcclxuICAgIFxyXG4gICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBSRUFEL1JFVFVSTiBtb3ZpZSBieSBJRC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIFxyXG4gICAgICovXHJcbiAgcHVibGljIGZpbmRNb3ZpZUJ5SWQoaWQ6IG51bWJlciwgY2FsbGJhY2s6IGFueSlcclxuICB7XHJcbiAgICAgICAvLyBMaXN0IG9mIG1vdmllcyB0byByZXR1cm5cclxuICAgICAgIGxldCBtb3ZpZSA6IE1vdmllO1xyXG5cclxuICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxyXG4gICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAge1xyXG4gICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXHJcbiAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHJcbiAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxyXG4gICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG5cclxuICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgbW92aWVcclxuICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuXHJcbiAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gTU9WSUVTIFdIRVJFIElEPT8nLCAgW2lkXSApO1xyXG4gICAgICAgICAgbW92aWUgPSBuZXcgTW92aWUocmVzdWx0MVswXS5JRCwgcmVzdWx0MVswXS5USVRMRSwgcmVzdWx0MVswXS5HRU5SRSwgcmVzdWx0MVswXS5ZRUFSX1JFTEVBU0VELCByZXN1bHQxWzBdLlJBVElORywgcmVzdWx0MVswXS5JTUFHRSwgcmVzdWx0MVswXS5WSURFTyk7XHJcblxyXG4gICAgICAgICBjb25zb2xlLmxvZyhcIlRpdGxlOiBcIiArIHJlc3VsdDFbMF0uVElUTEUpO1xyXG4gICAgICAgICBcclxuICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXHJcbiAgICAgICAgICBjYWxsYmFjayhtb3ZpZSk7XHJcbiAgICAgICB9KTtcclxuICBcclxuICAgIFxyXG4gICAgIH1cclxuXHJcblxyXG4gICAgIFxyXG4gLyoqXHJcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBSRUFEL1JFVFVSTiBNb3ZpZXMgYnkgVGl0bGVcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYW4gQXJyYXkgb2YgdHlwZSBNT1ZJRS5cclxuICAgICAqL1xyXG4gIHB1YmxpYyBmaW5kTW92aWVzQnlUaXRsZShjYWxsYmFjazogYW55KVxyXG4gIHtcclxuICAgICAgIC8vIExpc3Qgb2YgbW92aWVzIHRvIHJldHVyblxyXG4gICAgICAgbGV0IG1vdmllczpNb3ZpZVtdID0gW107XHJcblxyXG4gICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXHJcbiAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICB7XHJcbiAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcclxuICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cclxuICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXHJcbiAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgbW92aWVzXHJcbiAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCBUSVRMRSBGUk9NIE1PVklFUyBPUkRFUiBCWSBJRCcpO1xyXG4gICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcclxuICAgICAgICAgIHsgICAgIFxyXG4gICAgICAgICAgICAgIC8vIEFkZCBtb3ZpZSB0byB0aGUgbGlzdFxyXG4gICAgICAgICAgICAgIG1vdmllcy5wdXNoKG5ldyBNb3ZpZShyZXN1bHQxW3hdLklELCByZXN1bHQxW3hdLlRJVExFLCByZXN1bHQxW3hdLkdFTlJFLCByZXN1bHQxW3hdLllFQVJfUkVMRUFTRUQsIHJlc3VsdDFbeF0uUkFUSU5HLCByZXN1bHQxW3hdLklNQUdFLCByZXN1bHQxW3hdLlZJREVPKSk7IFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXHJcbiAgICAgICAgICBjYWxsYmFjayhtb3ZpZXMpO1xyXG4gICAgICAgfSk7XHJcbiAgICBcclxuICAgICB9XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogQ1JVRCBtZXRob2QgdG8gdXBkYXRlIGEgTW92aWUuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBtb3ZpZSBNb3ZpZSB0byB1cGRhdGUuXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBudW1iZXIgb2Ygcm93cyB1cGRhdGVkLiAgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGUobW92aWU6TW92aWUsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcclxuICAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxyXG4gICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiBcclxuICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuIFxyXG4gICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgdXBkYXRlIE1vdmllXHJcbiAgICAgICAgICAgICBsZXQgY2hhbmdlcyA9IDA7XHJcbiAgICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnVVBEQVRFIE1PVklFUyBTRVQgVElUTEU9PywgR0VOUkU9PywgWUVBUl9SRUxFQVNFRD0/LCBSQVRJTkc9PywgSU1BR0U9PywgVklERU89PyBXSEVSRSBJRD0/JywgW21vdmllLlRpdGxlLCBtb3ZpZS5HZW5yZSwgbW92aWUuWWVhcl9SZWxlYXNlZCwgbW92aWUuUmF0aW5nLCBtb3ZpZS5JbWFnZSwgbW92aWUuVmlkZW8sIG1vdmllLklkXSk7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdDEuY2hhbmdlZFJvd3MgIT0gMClcclxuICAgICAgICAgICAgICAgICsrY2hhbmdlcztcclxuIFxyXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xyXG4gICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2VzKTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgfVxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBERUxFVEUgYSBNb3ZpZS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGFsYnVtIE1vdmllXHJcbiAgICAgKiAgSUQgdG8gZGVsZXRlLlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggbnVtYmVyIG9mIHJvd3MgZGVsZXRlZC4gIFxyXG4gICAgICogKi9cclxuICAgIHB1YmxpYyBkZWxldGUobW92aWVJZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcclxuICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZGVsZXRlIHRoZSBtb3ZpZVxyXG4gICAgICAgICAgICBsZXQgY2hhbmdlcyA9IDA7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdERUxFVEUgRlJPTSBNT1ZJRVMgV0hFUkUgSUQ9PycsIFttb3ZpZUlkXSk7XHJcbiAgICAgICAgICAgIGNoYW5nZXMgPSBjaGFuZ2VzICsgcmVzdWx0MS5hZmZlY3RlZFJvd3M7XHJcblxyXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xyXG4gICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2VzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgIFxyXG4gICAgXHJcblxyXG4gICAgLy8qICoqKioqKioqKioqKioqKiogUHJpdmF0ZSBIZWxwZXIgTWV0aG9kcyAqKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcml2YXRlIGhlbHBlciBtZXRob2QgdG8gaW5pdGlhbGl6ZSBhIERhdGFiYXNlIENvbm5lY3Rpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0RGJDb25uZWN0aW9uKCk6YW55XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG15c3FsLmNyZWF0ZVBvb2woe2hvc3Q6IHRoaXMuaG9zdCwgcG9ydDogdGhpcy5wb3J0LCB1c2VyOiB0aGlzLnVzZXJuYW1lLCBwYXNzd29yZDogdGhpcy5wYXNzd29yZCwgZGF0YWJhc2U6IHRoaXMuc2NoZW1hLCBjb25uZWN0aW9uTGltaXQ6IDEwfSk7XHJcbiAgICB9XHJcbn1cclxuIl19