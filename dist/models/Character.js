"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    constructor(id, name, description, age, movieIds, era, canon) {
        this.id = id;
        this.name = name || "";
        this.description = description || "";
        this.age = age || 0;
        this.movieIds = movieIds || [];
        this.era = era || "";
        this.canon = canon || true;
    }
}
exports.default = Person;
