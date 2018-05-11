import {inject, injectable} from "inversify";
import TYPES from "../constants/types";
import {MovieRepository} from "../repositories/MovieRepository";
import {Movie} from "../models/Movie";
import {transformDao} from "../functions/MovieTransformer";
import MovieDao from "../models/dao/MovieDao";
import {Eras} from "../constants/arrays";

@injectable()
export class MovieService {
    constructor(@inject(TYPES.MovieRepository)private movieRepository:MovieRepository){}

    public async createMovie(createMovieRequest:any): Promise<Movie> {
        let movieDao:MovieDao = this.formatCreateMovieRequest(createMovieRequest);
        return this.movieRepository.createMovie(movieDao);
    }

    public async getMovies(): Promise<Movie[]> {
        return await this.movieRepository.getMovies()
            .then(dbMovies => {
                if(dbMovies){
                    let movies:Movie[] = [];
                    dbMovies.map(dbMovie => {
                        let movie:Movie = transformDao(dbMovie);
                        movies.push(movie);
                    });
                    return movies;
                }
                else return null;
            })
    }

    public async getMovie(id:string): Promise<Movie> {
        return await this.movieRepository.getMovie(id)
            .then(dbMovie => {
                return transformDao(dbMovie);
            });
    }

    public async updateMovie(id:string, request:any): Promise<Movie> {
        return await this.movieRepository.updateMovie(id, request)
            .then(dbMovie => {
               return transformDao(dbMovie);
            });
    }

    public async deleteMovie(id:string): Promise<void> {
        return await this.movieRepository.deleteMovie(id)
            .then(() =>{return null});
    }


    //region HELPERS

    private formatCreateMovieRequest(request: any): MovieDao{
        if(request== null || typeof request != "object")
            throw new Error();
        let keys = Object.keys(request);
        if(!keys || keys.length === 0) {
            throw new Error();
        }
        let movieDao = new MovieDao();
        let expectedKeys = Object.keys(movieDao);
        keys.map(key => {
            if(expectedKeys.indexOf(key) > -1) {
                if(key === "releaseDate")
                    movieDao[key] = new Date(request[key]);
                movieDao[key] = request[key];
            }
        });
        this.validateMovieDao(movieDao);
        return movieDao;
    }

    private validateMovieDao(request:MovieDao) :void {
        if(request == null || Object.keys(request).length === 0)
            throw new Error("Request was null");
        if(request.name == null || request.name === "")
            throw new Error("Name cannot be null");
        if(request.releaseDate == null)
            throw new Error("Release date must be supplied");
        if(request.era) {
            let eraExists = false;
            Eras.map(era => {
                if(era.localeCompare(request.era) === 0)
                    eraExists = true;
            });
            if(!eraExists)
                throw new Error("Invalid value supplied for era");
        }
    }


    //endregion
}