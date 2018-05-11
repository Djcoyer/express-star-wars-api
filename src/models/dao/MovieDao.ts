import UuidStatic = require("uuid");

export default class MovieDao {

    id:string;
    name:string;
    releaseDate:Date;
    description: string;
    era:string;

    constructor(id?:string, name?:string, releaseDate?:string,description?:string,era?:string) {
        this.id = id || UuidStatic.v4().toString();
        this.name = name || "";
        this.releaseDate = releaseDate ? new Date(releaseDate) : new Date();
        this.description = description || "";
        this.era = era || "";
    }
}