import {injectable} from "inversify";
import MovieDao from "../models/dao/MovieDao";
import {Character, Movie} from "../models/mongoose/schemas";
import {convertFromDbObject} from "../functions/DbConverters";
import {patchDbObject} from "../functions/PatchFunctions";
import { getDaosFromDbObjects } from "../functions/CommonFunctions";

@injectable()
export class MovieRepository {

    public async createMovie(movieDao:MovieDao): Promise<MovieDao> {
        let {name, releaseDate, era, description} = movieDao;
        return await new Movie({
            name,
            era,
            description,
            releaseDate
        }).save()
            .then(movie=> {
                console.log(movie);
                movieDao.id = movie._id;
                return movie;
            })
            .catch(err =>{
                if(err) {
                    console.log(err);
                    throw new Error("Failed to create movie");
                }
            });
    }

    public async getMovies(): Promise<MovieDao[]> {
        return await Movie.find()
            .then(dbMovies => {
              return getDaosFromDbObjects<MovieDao>(dbMovies, new MovieDao());
            });
    }

    public async getMoviesByEra(era:string): Promise<MovieDao[]> {
        return await Movie.find({era}, dbMovies => {
            return getDaosFromDbObjects<MovieDao>(dbMovies, new MovieDao());
        });
    }

    public async getMovie(id:string): Promise<MovieDao> {
        return await Movie.findOne({_id:id})
            .then(dbMovie => {
                if(dbMovie)
                    return convertFromDbObject(dbMovie, new MovieDao());
            });
    }

    public async updateMovie(id:string, updateRequest: any): Promise<MovieDao> {
        return Movie.findOne({_id:id})
            .then(dbMovie => {
                if(dbMovie){
                    dbMovie = patchDbObject(updateRequest, dbMovie, id);
                    dbMovie.save(err => {
                        if(err) {
                            console.log(err);
                            throw new Error("Could not update movie");
                        }
                        return convertFromDbObject(dbMovie, new MovieDao());
                    });

                }

            })
    }

    public async deleteMovie(id:string): Promise<void> {
        return await Movie.findOneAndRemove({_id:id})
            .then(() => {return null})
            .catch(err => {
                if(err) {
                    console.log(err);
                    throw new Error("Could not update movie");
                }
            });
    }
}