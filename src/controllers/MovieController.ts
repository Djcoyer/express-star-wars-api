import {MovieService} from "../services/MovieService";
import TYPES from "../constants/types";
import {inject} from "inversify";
import {controller, httpDelete, httpGet, httpPatch, httpPost, queryParam} from "inversify-express-utils";
import {Movie} from "../models/Movie";
import {Request} from 'express';

@controller('/movies')
export class MovieController {
    constructor(@inject(TYPES.MovieService)private movieService:MovieService) {
    }

    @httpPost('/')
    public async createMovie(request:Request): Promise<Movie> {
        return await this.movieService.createMovie(request.body)
            .then(movie => {
                return movie;
            });
    }

    @httpGet('/')
    public async getMovies(request:Request, @queryParam("era") eraQuery:string): Promise<Movie[]> {
        if(eraQuery != null) {
            return await this.movieService.getMoviesByEra(eraQuery)
            .then(movies => {
                return movies;
            });
        }
        return await this.movieService.getMovies()
            .then(movies => {
                return movies;
            });
    }

    @httpGet('/:id')
    public async getMovie(request:Request): Promise<Movie> {
        return await this.movieService.getMovie(request.params.id)
            .then(movie => {
                return movie;
            });
    }

    @httpPatch('/:id')
    public async updateMovie(request:Request): Promise<Movie> {
        return await this.movieService.updateMovie(request.params.id, request.body)
            .then(movie => {
               return movie;
            });
    }

    @httpDelete('/:id')
    public async deleteMovie(request:Request): Promise<void> {
        return await this.movieService.deleteMovie(request.params.id)
            .then(response => {
                return response;
            });
    }


}