import {controller, httpGet} from 'inversify-express-utils';
import {inject} from "inversify";
import Person from "../models/Person";
import {PersonService} from "../services/PersonService";
import TYPES from "../constants/types";


@controller('/people')
export class PersonController{
    constructor(@inject(TYPES.PersonService)private personService:PersonService){}

    @httpGet('/')
    public getPeople(): Person[] {
        return this.personService.getPeople();
    }

    // @httpGet('/')
    // public getBooks(): IBook[] {
    //     return this.bookService.getBooks();
    // }
    //
    // @httpGet('/:id')
    // public getBook(request:Request): IBook {
    //     return this.bookService.getBook(request.params.id);
    // }
    //
    // @httpPost('/')
    // public addBook(request:Request): IBook {
    //     return this.bookService.addBook(request.body);
    // }
}