"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UuidStatic = require("uuid");
class Movie {
    constructor(id, name, releaseDate, series, cancn, characterIds, planetIds) {
        this.id = id || UuidStatic.v4.toString();
        this.name = name || "";
        this.releaseDate = releaseDate || "";
        this.series = series || "";
        this.canon = cancn || true;
        this.characterIds = characterIds || [];
        this.planetIds = planetIds || [];
    }
}
exports.Movie = Movie;
