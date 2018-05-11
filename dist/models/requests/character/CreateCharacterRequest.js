"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCharacterRequest {
    constructor(name, description, age, movieIds, era, canon) {
        this.name = name || "";
        this.description = description || "";
        this.age = age || 0;
        this.movieIds = movieIds || [];
        this.era = era || "";
        this.canon = canon || true;
    }
}
exports.default = CreateCharacterRequest;
