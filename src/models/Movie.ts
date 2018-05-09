import UuidStatic = require("uuid");

export class Movie {
    public id:string;
    public name:string;
    public releaseDate:string;
    public series:string;
    public canon:boolean;
    public characterIds:string[];
    public planetIds:string[];

    constructor()
    constructor(id?:string, name?:string, releaseDate?:string, series?:string, cancn?:boolean, characterIds?:string[], planetIds?:string[]) {
        this.id = id || UuidStatic.v4.toString();
        this.name = name || "";
        this.releaseDate = releaseDate || "";
        this.series = series || "";
        this.canon = cancn || true;
        this.characterIds = characterIds || [];
        this.planetIds = planetIds || [];
    }
}
