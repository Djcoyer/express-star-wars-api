"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const characterSchema = new Schema({
    id: String,
    name: String,
    description: String,
    age: Number,
    movieIds: { type: Array },
    era: String,
    canon: Boolean
});
const Character = mongoose.model('characters', characterSchema);
exports.Character = Character;
