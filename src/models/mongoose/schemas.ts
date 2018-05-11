const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    id: String,
    name: String,
    description: String,
    age: Number,
    movieIds: {type: Array},
    era: String,
    canon: Boolean
});


const movieSchema = new Schema({
   id: String,
   name: String,
   releaseDate: String,
   description: String,
   era: String
});

var Character = mongoose.model('characters', characterSchema);

var Movie = mongoose.model('movies', movieSchema);


export {
    Character,
    Movie
}