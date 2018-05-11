import MovieDao from "../models/dao/MovieDao";
import {Movie} from "../models/Movie";

export {
    transform,
    transformDao
};

function transformDao(movieDao:MovieDao):Movie {
    let movie:Movie = new Movie();
    movie.releaseDate = movieDao.releaseDate;
    movie.name = movieDao.name;
    movie.description = movieDao.description;
    movie.era = movieDao.era;
    movie.id = movieDao.id;
    return movie;
}

function transform(movie:Movie): MovieDao {
    let movieDao:MovieDao = new MovieDao();
    movieDao.description = movie.description;
    movieDao.name = movie.description;
    movieDao.releaseDate = movie.releaseDate;
    movieDao.era = movie.era;
    movieDao.id = movie.id;
    return movieDao;
}

